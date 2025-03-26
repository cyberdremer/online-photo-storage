const { Router } = require("express");
const createAccount = require("../controllers/signup");

const signUpRoute = Router();

signUpRoute.post("/", createAccount);

module.exports = signUpRoute;
