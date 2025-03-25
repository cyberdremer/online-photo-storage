import asyncHandler from "express-async-handler";
import { logInValidation } from "../validators/validators.js";
import prisma from "../prisma-client/prismainstance.js";
import passportConfig from "../config/passport.js";
import { validationResult } from "express-validator";
import { generateRefreshToken, generateUserToken } from "../utils/token.js";

const loginToAccountController = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      error: {
        message: errors.array(),
        status: 400,
      },
    });
  }

  passportConfig.authenticate("local", async (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      res.status(400).json({
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
  });
});

const loginToAccount = [logInValidation, loginToAccountController];

export default loginToAccount;
