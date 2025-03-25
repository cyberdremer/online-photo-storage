import { Router } from "express";
import { createAccount } from "../controllers/signup.js";
const signUpRoute = Router();


signUpRoute.post("/", createAccount)

export default signUpRoute;