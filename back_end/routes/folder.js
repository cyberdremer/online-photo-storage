const { Router } = require("express");
const {
  createFolder,
  getFoldersAndFiles,
  updateFolder,
  deleteFolder,
} = require("../controllers/folder");
const folderRoute = Router();

folderRoute.delete("/:folderId", deleteFolder);
folderRoute.post("/:parentFolderId?", createFolder);
folderRoute.put("/:folderId?", updateFolder);
folderRoute.get("/:folderId?", getFoldersAndFiles);

module.exports = folderRoute;
