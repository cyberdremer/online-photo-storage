const { logInValidation } = require("../validators/validators");
const passport = require("../config/passport");
const { validationResult } = require("express-validator");
const { generateUserToken } = require("../utils/token");

const asyncHandler = require("express-async-handler");

const loginToAccount = [
  logInValidation,
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: {
          message: errors.array(),
          status: 400,
        },
      });
    }

    passport.authenticate("local", async (err, user, info) => {
      if (err) return next(err);
      if (!user) {
        return res.status(400).json({
          error: {
            message: "Error in finding user",
            status: 400,
          },
        });
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
