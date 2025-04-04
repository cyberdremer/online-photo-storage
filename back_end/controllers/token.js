const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const ErrorWithStatusCode = require("../classes/error");
const { generateUserToken, generateRefreshToken } = require("../utils/token");

const tokenRefresh = asyncHandler(async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    throw new ErrorWithStatusCode("Token Invalid or Expired", 403);
  }

  jwt.verify(refreshToken, process.env.JWTREFRESHTOKENSECRET, (err, user) => {
    if (err) {
      throw new ErrorWithStatusCode("Token Invalid or Expired", 403);
    }
    const newUserToken = generateUserToken(user);
    const newRefreshToken = generateRefreshToken(user);
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    res.json({
      data: {
        token: newUserToken,
        message: "Your token has been refreshed",
      },
    });
  });
});


module.exports = tokenRefresh;