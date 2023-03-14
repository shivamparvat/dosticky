const { CatchAsyncError } = require("../middleware/catchasyncerror");
const userModule = require("../module/userModule");
const cloudinary = require("cloudinary");
const crypto = require("crypto");
const ErrorHandler = require("../utils/ErrorHeandler");
const responseToken = require("../utils/responseToken");
const Crud = require("../utils/crud");
const sendMail = require("../utils/sendMail");
const dataUri = require("../utils/dataUri");
const ErrorHeandler = require("../utils/ErrorHeandler");

// user creation
exports.newUser = CatchAsyncError(async (req, res, next) => {
  const email = req.body.email;
  req.body.email = email.toLowerCase();
  const user = await userModule.create(req.body);
  req.user = user;
  let updatedData;
  if (req.file != undefined) {
    // create data uri for file buffer
    const fileUri = dataUri(req.file);
    // upload file
    const dataURL = await cloudinary.v2.uploader.upload(fileUri.content);
    // add url
    updatedData = await userModule.findByIdAndUpdate(
      user._id,
      {
        images: { image_id: dataURL.asset_id, image_url: dataURL.secure_url },
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
  }
  // send response
  responseToken(updatedData == undefined ? user : updatedData, 201, res);
});

// // login
exports.login = CatchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  // qurey
  const user = await userModule
    .findOne({ email: email.toLowerCase() })
    .select("password");
  // if uer not found
  if (!user) next(new ErrorHandler(404, "user not found"));
  // password pamperetion
  const isPasswordMatch = await user.comperePassword(password);
  // if password is worng
  if (!isPasswordMatch)
    next(new ErrorHeandler(400, "please enter vaild email and password"));
  req.user = user;
  // sending response
  responseToken(user, 200, res);
});

// // find one your

exports.getUser = CatchAsyncError(async (req, res, next) => {
  // useing crud obj findgin doc
  await new Crud(userModule, req, res, next).getOne("user");
});

// update user
exports.updateUser = CatchAsyncError(async (req, res, next) => {
  const { email, password } = req.user;

  // finding user for email and password if user is login then be get email and password
  if (!(email && password))
    next(new ErrorHandler(400, "please enter vaild email and password"));

  const user = await userModule.findOne({ email }).select("password");

  // if uer not found
  if (!user) next(new ErrorHandler(404, "user not found"));
  // user can not be change password ,email,and role
  const remove = ["password", "email", "role"];
  // removeing key
  remove.map((key) => delete req.body[key]);
  // updateing doc
  const data = await userModule.findByIdAndUpdate(user._id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  if (!data) next(new ErrorHandler(404, "user not found"));
  responseToken(user, 200, res);
});

// // account delete
exports.deleteUser = CatchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!(email && password))
    next(new ErrorHandler(400, "please enter vaild email and password"));

  const user = await userModule.findOne({ email }).select("password");
  // if uer not found
  if (!user) next(new ErrorHandler(404, "user not found"));

  // password pamperetion
  const isPasswordMatch = await user.comperePassword(password);

  // if password is worng
  if (!isPasswordMatch)
    return next(
      new ErrorHandler(400, "please enter vaild email and password 2")
    );

  user.remove();
  res.status(201).json({ message: "success" });
});

exports.logOut = CatchAsyncError(async (req, res, next) => {
  req.user = {};
  res
    .status(200)
    .cookie("token", null, {
      exprires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "logout successfully",
    });
});
exports.updateUserRole = CatchAsyncError(async (req, res, next) => {
  const data = await userModule.findByIdAndUpdate(
    req.params.id,
    { role: req.body.role },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  if (!data) next(new ErrorHandler(404, "user not found"));
  responseToken(user, 200, res);
});

exports.forgetPassword = CatchAsyncError(async (req, res, next) => {
  const email = req.body.email;
  const user = await userModule.findOne({ email: email.toLowerCase() });
  if (!user) return next(new ErrorHandler(404, "user not found"));
  // get token and save
  const token = await user.passwordResettoken();
  await user.save();
  // create msg
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/user/reset/${token}`;
  const message = `user password reset token is :-\n\n\n ${resetUrl}\n\n `;

  try {
    sendMail({
      email: user.email,
      subject: "password recovery",
      message,
    });
    res.status(200).json({
      success: true,
      message: `email sand to ${user.email} successfully`,
    });
  } catch (e) {
    user.passwordResettoken = undefined;
    user.resetPassExport = undefined;
    await user.save();
    next(new ErrorHandler(500, e.message));
  }
});

// reset

exports.resetPassword = CatchAsyncError(async (req, res, next) => {
  const resetPassTokan = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await userModule.findOne({
    resetPassTokan,
    resetPassExport: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not password", 400));
  }

  user.password = req.body.password;
  user.resetPassTokan = undefined;
  user.resetPassExport = undefined;

  await user.save();
  responseToken(user, 200, res);
});

// change password
exports.changePassword = CatchAsyncError(async (req, res, next) => {
  const { oldPaassword, password, confirmPassword } = req.body;
  // if old and new password is same
  if (oldPaassword == password)
    return next(new ErrorHeandler(400, "old and new password is same"));

  // password compering  
  const ifPsswordMatch = await req.user.comperePassword(oldPaassword);

  // if password match
  if (ifPsswordMatch && password == confirmPassword) {
    req.user.password = password
    await req.user.save()
    responseToken(req.user, 200, res);
  }
  res.status(400).json({message:"password is wrong"})
});

// upload file update 1234
exports.imageUpdate = CatchAsyncError(async (req, res, next) => {
  const { result } = await cloudinary.v2.uploader.destroy(
    req.user.images.asset_id
  );
  if (result === "not found")
    throw new BadRequestError("Please provide correct public_id");

  if (result !== "ok") throw new Error("Try again later.");
  if (req.file != undefined) {
    // create data uri for file buffer
    const fileUri = dataUri(req.file);
    // upload file
    const dataURL = await cloudinary.v2.uploader.upload(fileUri.content);
    // add url
    updatedData = await userModule.findByIdAndUpdate(
      user._id,
      {
        images: { image_id: dataURL.asset_id, image_url: dataURL.secure_url },
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
  }
});
// upload file delete 1234
