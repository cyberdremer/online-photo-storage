const ExtractJwt = require("passport-jwt").ExtractJwt;
const JwtStrategy = require("passport-jwt").Strategy;
const prisma = require("../prisma-client/prismainstance");
require("dotenv").config();

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWTTOKENSECRET,
};

const jwtStrategy = new JwtStrategy(options, async (jwt_payload, done) => {
  try {
    const user = await prisma.user.findFirstOrThrow({
      where: {
        username: jwt_payload.username,
      },
      include: {
        folders: {
          where: {
            parentfolder: null,
          },
        },
      },
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
