import { validationResult, body } from "express-validator";
import prisma from "../prisma-client/prismainstance.js";
import bcrypt from "bcryptjs";
const emptyError = "field cannot be empty!";
const emailError = "field must be an email!";

const signUpValidation = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage(`Username : ${emptyError}`)
    .escape()
    .customSanitizer(async (username) => {
      const user = await prisma.user.findFirst({
        where: {
          username: username,
        },
      });
      if (!user) {
        return false;
      }
    })
    .withMessage(`Username is already registered to another user!`),

  body("email")
    .trim()
    .notEmpty()
    .withMessage(`Email :${emptyError}`)
    .normalizeEmail()
    .escape()
    .isEmail()
    .withMessage(`Email: ${emailError}`)
    .customSanitizer(async (email) => {
      const user = await prisma.user.findFirst({
        where: {
          email: email,
        },
      });

      if (user) {
        return false;
      }
    })
    .withMessage(`Email is already registered to another user!`),

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
    .customSanitizer(async (confirmpassword, { req }) => {
      return confirmpassword === req.body.pasword;
    })
    .withMessage(`Passwords must match!`),
];

const logInValidation = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage(`Username :${emptyError}`)
    .escape()
    .customSanitizer(async (username) => {
      const user = await prisma.user.findFirst({
        where: {
          username: username,
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
    .customSanitizer(async (password, { req }) => {
      const user = await prisma.user.findFirst({
        where: {
          username: req.body.username,
        },
      });
      return bcrypt.compare(password, user.password);
    })
    .withMessage(`Invalid credentials, please try again`),
];

export {
  signUpValidation,
  logInValidation
}
