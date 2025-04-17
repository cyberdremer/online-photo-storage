const { Router } = require("express");

const {
  createFolder,
  getFoldersAndFiles,
  updateFolder,
  deleteFolder,
} = require("../controllers/folder");
const folderRoute = Router();

folderRoute.put("/:parentFolderId?/:folderId", updateFolder);
folderRoute.delete("/:folderId", deleteFolder);
folderRoute.post("/:parentFolderId?", createFolder);
folderRoute.get("/:folderId?", getFoldersAndFiles);

module.exports = folderRoute;
