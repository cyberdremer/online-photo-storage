const asyncHandler = require("express-async-handler");
const { signUpValidation } = require("../validators/validators");
const hashPassword = require("../utils/password.js");
const prisma = require("../prisma-client/prismainstance");
const { validationResult } = require("express-validator");

const createAccount = [
  signUpValidation,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: {
          messsage: errors.array(),
          status: 400,
        },
      });
    }
    const hashedpassword = await hashPassword(req.body.password);
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: hashedpassword,
        folders: {
          create: {
            name: "root",
          }
        }
      }
    });

    return res.status(201).json({
      data: {
        messsage: "User has been created!",
        status: 201,
      },
    });
  }),
];

module.exports = createAccount;
