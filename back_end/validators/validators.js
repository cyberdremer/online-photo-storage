const prisma = require("../prisma-client/prismainstance");
const bcrypt = require("bcryptjs");
const { body } = require("express-validator");

const emptyError = "field cannot be empty!";
const emailError = "field must be an email!";

const signUpValidation = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage(`Username : ${emptyError}`)
    .escape()
    .custom(async (value) => {
      const user = await prisma.user.findFirst({
        where: {
          username: value,
        },
      });
      if (user) {
        throw new Error(`Username already exists!`);
      }
    }),

  body("email")
    .trim()
    .notEmpty()
    .withMessage(`Email :${emptyError}`)
    .normalizeEmail()
    .isEmail()
    .withMessage(`Email: ${emailError}`)
    .custom(async (value) => {
      const user = await prisma.user.findFirst({
        where: {
          email: value,
        },
      });

      if (user) {
        throw new Error("Email is already registered to another user!");
      }
    }),

  body("firstname")
    .trim()
    .notEmpty()
    .withMessage(`First name : ${emptyError}`)
    .escape(),

  body("lastname")
    .trim()
    .notEmpty()
    .withMessage(`Last Name: ${emptyError}`)
    .escape(),

  body("password")
    .trim()
    .notEmpty()
    .withMessage(`Password: ${emptyError}`)
    .escape()
    .isLength({ min: 8 })
    .matches(`^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$`)
    .withMessage(
      "Password must contain an uppercase letter, a lowercase letter, a number and a special character "
    ),

  body("confirmpassword")
    .trim()
    .notEmpty()
    .withMessage(`Password: ${emptyError}`)
    .custom(async (value, { req }) => {
      return value === req.body.password;
    })
    .withMessage(`Passwords must match!`),
];

const logInValidation = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage(`Username :${emptyError}`)
    .escape()
    .custom(async (value) => {
      const user = await prisma.user.findFirst({
        where: {
          username: value,
        },
      });
      if (!user) {
        throw new Error(`Invalid credentials, please try again`);
      }
    }),

  body("password")
    .trim()
    .notEmpty()
    .withMessage(`Password :${emptyError}`)
    .escape()
    .custom(async (value, { req }) => {
      const user = await prisma.user.findFirst({
        where: {
          username: req.body.username,
        },
      });
      return bcrypt.compare(value, user.password);
    })
    .withMessage(`Invalid credentials, please try again`),
];

const folderValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage(`Folder Name: ${emptyError}`)
    .toLowerCase()
    .escape(),
];

const fileValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage(`File Name :${emptyError}`)
    .toLowerCase()
    .escape(),
];

module.exports = {
  signUpValidation,
  logInValidation,
  folderValidation,
  fileValidation,
};
