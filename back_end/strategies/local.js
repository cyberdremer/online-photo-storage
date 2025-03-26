const { Strategy } = require("passport-local");
const bcrypt = require("bcryptjs");
const prisma = require("../prisma-client/prismainstance");

const localStrategy = new Strategy(async (username, password, done) => {
  try {
    const user = await prisma.user.findFirstOrThrow({
      where: {
        username: username,
      },
      include: {
        folders: {
          where: {
            parentfolder: null
          }
        }
      }
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

module.exports = localStrategy;
