const multer = require("multer");
const path = require("path");
const decodeFileName = require("../utils/decodefilename");
const fs = require("node:fs");
const pathname = "./public/uploads";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(pathname)) {
      fs.mkdirSync(pathname, { recursive: true });
    }
    cb(null, pathname);
  },
  filename: (req, file, cb) => {
    const filename = decodeFileName(file.originalname);
    const ext = path.extname(filename);
    const basename = path.basename(filename, ext);
    cb(null, `${basename}-${Date.now()}${ext}`);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
