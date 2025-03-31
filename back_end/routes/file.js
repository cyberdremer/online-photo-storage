const { Router } = require("express");
const fileRoute = Router();
const {
  uploadFile,
  deleteFile,
  downloadFile,
  updateFileName,
} = require("../controllers/file");

fileRoute.delete("/:fileId", deleteFile);
fileRoute.get("/:fileId", downloadFile);
fileRoute.put("/:fileId", updateFileName);
fileRoute.post("/:folderId?", uploadFile);


module.exports = fileRoute;
