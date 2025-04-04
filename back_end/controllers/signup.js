const asyncHandler = require("express-async-handler");
const { signUpValidation } = require("../validators/validators");
const hashPassword = require("../utils/password.js");
const prisma = require("../prisma-client/prismainstance");
const { validationResult } = require("express-validator");
const ErrorWithStatusCode = require("../classes/error.js");

const createAccount = [
  signUpValidation,
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ErrorWithStatusCode(errors.array(), 400);
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
          },
        },
      },
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
