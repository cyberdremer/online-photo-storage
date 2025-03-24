import passport from "passport";
import jwtStrategy from "../strategies/jwt";
import localStrategy from "../strategies/local";

const passportConfig = passport;
passportConfig.use(jwtStrategy);
passportConfig.use(localStrategy);

export default passportConfig;
