const { Router } = require("express");
const loginToAccount = require("../controllers/login");
const loginRoute = Router();

loginRoute.post("/", loginToAccount);

module.exports = loginRoute;
