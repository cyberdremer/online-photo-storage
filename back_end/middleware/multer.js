const multer = require("multer");
const path = require("path");
const decodeFileName = require("../");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads/");
  },
  filename: (req, file, cb) => {
    const decodedname = decodeFileName(file.originalname);
    const extension = path.extname(decodedname);
    const basename = path.basename(decodedname, extension);
    cb(null, `${basename}-${Date.now()}${extension}`);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
