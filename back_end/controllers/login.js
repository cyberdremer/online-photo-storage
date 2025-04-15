const { logInValidation } = require("../validators/validators");
const passport = require("../config/passport");
const { validationResult } = require("express-validator");
const { generateUserToken, generateRefreshToken } = require("../utils/token");
const formatValidatorError = require("../utils/errorformatter");

const asyncHandler = require("express-async-handler");
const ErrorWithStatusCode = require("../classes/error");
const { array } = require("../middleware/multer");

const loginToAccount = [
  logInValidation,
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ErrorWithStatusCode(errors.array()[0].msg, 400);
    }

    passport.authenticate("local", async (err, user, info) => {
      if (err) return next(err);
      if (!user) {
        throw new ErrorWithStatusCode("User was not found!", 400);
      }

      const token = generateUserToken(user);
      const refreshToken = generateRefreshToken(user);
      res.status(201).json({
        data: {
          token: token,
          refreshToken: refreshToken,
          message: "You are succesfully logged in!",
          user: {
            username: user.username,
            rootFolderId: user.folders[0].id,
          }
        },
      });
    })(req, res, next);
  }),
];

module.exports = loginToAccount;
