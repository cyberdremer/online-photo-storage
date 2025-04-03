const { Router } = require("express");
const signUpRoute = require("./signup");
const loginRoute = require("./login");
const folder = require("./folder");
const file = require("./file");
const token = require("./token");
const topLevelRoute = Router();

topLevelRoute.use("/signup", signUpRoute);
topLevelRoute.use("/login", loginRoute);
topLevelRoute.use("/folder", folder);
topLevelRoute.use("/file", file);
topLevelRoute.use("/refresh-token", token);

module.exports = topLevelRoute;
