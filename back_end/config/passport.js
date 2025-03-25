import passport from "passport";
import jwtStrategy from "../strategies/jwt.js";
import localStrategy from "../strategies/local.js";

const passportConfig = passport;
passportConfig.use(jwtStrategy);
passportConfig.use(localStrategy);

export default passportConfig;
