import { Strategy } from "passport-local";
import bcrypt from "bcryptjs";
import prisma from "../prisma-client/prismainstance.js";

const localStrategy = new Strategy(async (username, password, done) => {
  try {
    const user = await prisma.user.findFirstOrThrow({
      where: {
        username: username,
      },
    });
    if (!user) {
      return done(null, false, { message: "Incorrect username" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return done(null, false, { message: "Incorrect credentials!" });
    }
    return done(null, user);
  } catch (error) {
    done(error);
  }
});

export default localStrategy;
