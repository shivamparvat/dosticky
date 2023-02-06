module.exports = responseToken = (user, code, res) => {
  const token = user.getJwtToken();
  const option = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPRIE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  res
    .status(code)
    .cookie("token", token, option)
    .json({ success: true, user, token });
};
