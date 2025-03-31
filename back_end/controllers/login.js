const { logInValidation } = require("../validators/validators");
const passport = require("../config/passport");
const { validationResult } = require("express-validator");
const { generateUserToken } = require("../utils/token");

const asyncHandler = require("express-async-handler");
const ErrorWithStatusCode = require("../classes/error");

const loginToAccount = [
  logInValidation,
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      next(new ErrorWithStatusCode(errors.array(), 400));
    }

    passport.authenticate("local", async (err, user, info) => {
      if (err) return next(err);
      if (!user) {
        next(new ErrorWithStatusCode("User was not found!", 400));
      }

      const token = generateUserToken(user);
      res.status(201).json({
        data: {
          token: token,
          message: "You are succesfully logged in!",
        },
      });
    })(req, res, next);
  }),
];

module.exports = loginToAccount;
