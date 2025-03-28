const { Router } = require("express");
const passport = require("../config/passport");
const {
  createFolder,
  getFoldersAndFiles,
  updateFolder,
  deleteFolder,
} = require("../controllers/folder");
const folderRoute = Router();

folderRoute.post("{/:parentFolderId}", createFolder);
folderRoute.put("{/:parentFolderId}", updateFolder);
folderRoute.delete("{/:folderId}", deleteFolder);
folderRoute.get("{/:folderId}", getFoldersAndFiles);

module.exports = folderRoute;
