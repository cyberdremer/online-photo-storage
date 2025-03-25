import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import { hashPassword } from "../utils/password.js";
import { signUpValidation } from "../validators/validators.js";
import prisma from "../prisma-client/prismainstance.js";

const createAccountController = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      error: {
        messsage: errors.array(),
        status: 400,
      },
    });
  }
  const hashedpassword = hashPassword(req.body.password);
  await prisma.user.create({
    data: {
      username: req.body.username,
      email: req.body.email,
      password: hashedpassword,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      folders: {
        create: {
          name: "root",
          parentfolder: null,
          parentid: null,
        },
      },
    },
  });

  res.status(201).json({
    data: {
      messsage: "User has been created!",
      status: 201,
    },
  });
});

const createAccount = [signUpValidation, createAccountController];

export { createAccount };
