const { Router } = require("express");
const tokenRouter = Router();
const refreshToken = require("../controllers/token");

tokenRouter.post("/", refreshToken);

module.exports = tokenRouter;
