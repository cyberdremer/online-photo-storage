const { Router } = require("express");
const signUpRoute = require("./signup");
const loginRoute = require("./login");
const topLevelRoute = Router();

topLevelRoute.use("/signup", signUpRoute);
topLevelRoute.use("/login", loginRoute);

module.exports = topLevelRoute;
