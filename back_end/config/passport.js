const passport = require("passport");
const jwtStrategy = require("../strategies/jwt");
const localStrategy = require("../strategies/local");


passport.use(jwtStrategy);
passport.use(localStrategy);

module.exports = passport;
