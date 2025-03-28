const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateUserToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      rootFolderID: user.folders[0].id,
    },
    process.env.JWTTOKENSECRET,
    { expiresIn: "5h" }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      username: user.username,
    },
    process.env.JWTTOKENSECRET,
    { expiresIn: "1d" }
  );
};

module.exports = {
  generateRefreshToken,
  generateUserToken,
};
