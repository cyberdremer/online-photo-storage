const decodeFileName = (filename) => {
  return Buffer.from(filename, "latin1").toString("utf-8");
};

module.exports = decodeFileName;
