import { Router } from "express";
import loginToAccount from "../controllers/login.js";
const loginRoute = Router();

loginRoute.post("/", loginToAccount);

export default loginRoute;
