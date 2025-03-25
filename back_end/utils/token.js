import jwt from "jsonwebtoken";
const {sign, verify} = jwt;
import "dotenv/config";

const generateUserToken = (user) => {
  return sign(
    {
      id: user.id,
      username: user.username,
      rootfolderid: user.folders[0].id,
    },
    process.env.JWTTOKENSECRET,
    { expiresIn: "5h" }
  );
};

const generateRefreshToken = (user) => {
  return sign(
    {
      username: user.username,
    },
    process.env.JWTTOKENSECRET,
    { expiresIn: "1d" }
  );
};

export { generateRefreshToken, generateUserToken };
