import { Strategy, ExtractJwt } from "passport-jwt";
import prisma from "../prisma-client/prismainstance";
import "dotenv/config";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secret: process.env.JWTTOKENSECRET,
};

const jwtStrategy = new Strategy(options, async (jwt_payload, done) => {
  try {
    const user = prisma.user.findFirstOrThrow({
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

export default jwtStrategy;
