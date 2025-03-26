const bcrypt = require("bcryptjs");

const hashPassword = async (password) => {
  const hashedpassword = await bcrypt.hash(password, 16);
  return hashedpassword;
};

module.exports = hashPassword;
