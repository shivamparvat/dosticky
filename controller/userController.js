const { CatchAsyncError } = require("../middleware/catchasyncerror");
const userModule = require("../module/userModule");
const cloudinary = require("cloudinary");

const ErrorHandler = require("../utils/ErrorHeandler");
const responseToken = require("../utils/responseToken");
const Crud = require("../utils/crud");
const sendMail = require("../utils/sendMail");
const getDataUri = require("../utils/dataUri");
// const sendMail = require("../utils/sendMail");

// user creation
exports.newUser = CatchAsyncError(async (req, res, next) => {
  const { name, lname, gender, age, number, email, password } = req.body;
  // create data uri for file buffer
  const fileUri = getDataUri(req.file);

   
  // user createtion funcation
  const user = await userModule.create({
    name,
    lname,
    gender,
    age,
    number,
    email,
    password,
    images: {
      image_id: myCloud.public_id,
      image_url: myCloud.secure_url,
    },
  });
  req.user = user;
  // send response
  responseToken(user, 201, res);
});

// // login
exports.login = CatchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email);
  console.log(password);
  // qurey
  const user = await userModule.findOne({ email }).select("password");
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
  res.status(201).json({ massage: "success", data });
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
  res.status(201).json({ massage: "success" });
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
      massage: "logout successfully",
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
  res.status(201).json({ massage: "success", data });
});

exports.forgetPassword = CatchAsyncError(async (req, res, next) => {
  const user = await userModule.findOne({ email: req.body.email });
  if (!user) return next(new ErrorHandler(404, "user not found"));
  // get token and save
  const token = await user.passwordResettoken();
  await user.save({ validateBeforeSave: false });
  // create msg
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/password/reset/${token}`;
  const massage = `user password reset token is :-\n\n\n ${resetUrl}\n\n `;

  try {
    sendMail({
      email: user.email,
      subject: "password recovery",
      massage,
    });
    res.status(200).json({
      success: true,
      massage: `email sand to ${user.email} successfully`,
    });
  } catch (e) {
    user.passwordResettoken = undefined;
    user.resetPassExport = undefined;
    await user.save({ validateBeforeSave: false });
    next(new ErrorHandler(500, e.massage));
  }
});


// upload file update 1234
// upload file delete 1234