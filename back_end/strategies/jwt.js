const { Strategy, ExtractJwt } = require("passport-jwt");
const prisma = require("../prisma-client/prismainstance");
require("dotenv").config();

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWTTOKENSECRET,
};

const jwtStrategy = new Strategy(options, async (jwt_payload, done) => {
  try {
    const user = await prisma.user.findFirstOrThrow({
      where: jwt_payload.id,
    });
    if (!user) {
      return done(null, false, { message: "User does not exist" });
    }
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
});

module.exports = jwtStrategy;
