import { Router } from "express";
import signUpRoute from "./signup.js";
import loginRoute from "./logIn.js";
const topLevelRoute = Router();

topLevelRoute.use("/signup", signUpRoute);
topLevelRoute.use("/login", loginRoute);

export default topLevelRoute;
