const { PrismaClient } = require("@prisma/client");
require("dotenv").config();
let databaseUrl;

const determineEnvironment = () => {
  if (process.env.NODE_ENV === "test") {
    databaseUrl = process.env.TEST_DATABASE_URL;
  } else if (process.env.NODE_ENV === "dev") {
    databaseUrl = process.env.DEV_DATABASE_URL;
  } else {
    databaseUrl = process.env.DATABASE_PUBLIC_URL;
  }
};

determineEnvironment();

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
});

module.exports = prisma;
