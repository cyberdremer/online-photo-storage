const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const { folderValidation } = require("../validators/validators");
const passport = require("../config/passport");
const cloudinary = require("cloudinary").v2;
const prisma = require("../prisma-client/prismainstance");
const ErrorWithStatusCode = require("../classes/error");

const createFolder = [
  passport.authenticate("jwt", { session: false }),
  folderValidation,
  asyncHandler(async (req, res, next) => {
    let parentFolderId = req.params.parentFolderId || req.user.folders[0].id;
    parentFolderId = Number(parentFolderId);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ErrorWithStatusCode(errors.array(), 409);
    }

    const folders = await prisma.folder.findFirst({
      where: {
        name: req.body.name,
        ownerid: req.user.id,
      },
    });

    if (folders) {
      throw new ErrorWithStatusCode("Folder already exists", 409);
    }

    await prisma.folder.create({
      data: {
        name: req.body.name,
        ownerid: req.user.id,
        parentid: parentFolderId,
      },
    });

    return res.status(201).json({
      data: {
        message: `Folder: ${req.body.name} sucessfully created!`,
        status: 201,
      },
    });
  }),
];

const deleteFolder = [
  passport.authenticate("jwt", { session: false }),
  asyncHandler(async (req, res, next) => {
    let folderId = req.params.folderId;
    folderId = Number(folderId);

    const folder = await prisma.folder.findFirst({
      where: {
        id: folderId,
        ownerid: req.user.id,
      },
      include: {
        subfolders: true,
        files: true,
      },
    });

    if (!folder) {
      throw new ErrorWithStatusCode(
        "Cannot delete a folder that does not exist!",
        403
      );
    }

    let { files, subfolders } = folder;

    while (subfolders.length) {
      let { files: currFiles, subfolders: currFolders } =
        await prisma.folder.findUnique({
          where: {
            id: subfolders.shift().id,
          },
          include: {
            subfolders: true,
            files: true,
          },
        });

      files.push(...currFiles);
      subfolders.push(...currFolders);
    }

    await prisma.folder.delete({
      where: {
        id: folderId,
      },
    });

    if (files.length) {
      files.forEach((file) => {
        cloudinary.uploader.destroy(file.cloudinarypublicid);
      });
    }

    return res.status(201).json({
      data: {
        message: `Deleted folder :${folder.name} and it's associated folders and files`,
        status: 201,
      },
    });
  }),
];

const updateFolder = [
  passport.authenticate("jwt", { session: false }),
  folderValidation,
  asyncHandler(async (req, res, next) => {
    let folderId = req.params.folderId || req.user.folders[0].id;
    folderId = Number(folderId);

    const newName = req.body.name;

    const folder = await prisma.folder.findFirst({
      where: {
        name: newName,
        id: Number(folderId),
      },
    });
    if (folder) {
      throw new ErrorWithStatusCode(
        "Folder name already exists! Select a new folder name! ",
        409
      );
    }
    await prisma.folder.update({
      where: {
        ownerid: req.user.id,
        id: Number(folderId),
      },
      data: {
        name: newName,
      },
    });

    return res.status(201).json({
      data: {
        message: `Updated folder! Folder was renamed to ${newName}`,
        status: 201,
      },
    });
  }),
];

const getFoldersAndFiles = [
  passport.authenticate("jwt", { session: false }),
  asyncHandler(async (req, res, next) => {
    let folderId = req.params.folderId || req.user.folders[0].id;
    folderId = Number(folderId);

    const [folders, files] = await Promise.all([
      await prisma.folder.findMany({
        where: {
          ownerid: req.user.id,
          parentid: folderId,
        },
        include: {
          files: true,
        },
      }),
      await prisma.file.findMany({
        where: {
          ownerid: req.user.id,
          folderid: folderId,
        },
      }),
    ]);

    return res.status(201).json({
      data: {
        message: "Succesfully obtained folders and files",
        files: files,
        folders: folders,
      },
    });
  }),
];

module.exports = {
  getFoldersAndFiles,
  createFolder,
  updateFolder,
  deleteFolder,
};
