const { logInValidation } = require("../validators/validators");
const passport = require("../config/passport");
const { validationResult } = require("express-validator");
const { generateUserToken } = require("../utils/token");
const formatValidatorError = require("../utils/errorformatter");

const asyncHandler = require("express-async-handler");
const ErrorWithStatusCode = require("../classes/error");

const loginToAccount = [
  logInValidation,
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = formatValidatorError(errors.array());
      throw new ErrorWithStatusCode(errorMessages[0], 400);
    }

    passport.authenticate("local", async (err, user, info) => {
      if (err) return next(err);
      if (!user) {
        throw new ErrorWithStatusCode("User was not found!", 400);
      }

      const token = generateUserToken(user);
      res.status(201).json({
        data: {
          token: token,
          message: "You are succesfully logged in!",
          user: {
            username: user.username,
            rootFolderId: user.folder[0].id,
          }
        },
      });
    })(req, res, next);
  }),
];

module.exports = loginToAccount;
