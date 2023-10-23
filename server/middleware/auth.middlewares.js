const Jwt = require("jsonwebtoken");
const userModule = require("../module/userModule");
const ErrorHandler = require("../utils/ErrorHeandler");
const { CatchAsyncError } = require("./catchasyncerror.middlewares");

exports.isAuthUser = CatchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token)
    return next(new ErrorHandler(401, "Please Login to Access this Resource."));

  const decodedData = Jwt.verify(token, process.env.JWT_SECRET);
  const user = await userModule.findById(decodedData.id);

  // add
  if (user?.isEmailVerified === false && !user)
    return next(new ErrorHandler(401, "email not Verified "));
  req.user = user;
  next();
});

exports.isRoleIsValid =
  (...role) =>
  (req, res, next) => {
    if (!role.includes(req.user.role)) {
      return next(
        new ErrorHandler(403, `${req.user.role} role is not allowed`)
      );
    }
    next();
  };
