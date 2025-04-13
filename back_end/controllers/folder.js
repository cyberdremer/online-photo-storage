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
      throw new ErrorWithStatusCode(errors.array(), 403);
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

    const createdFolder = await prisma.folder.create({
      data: {
        name: req.body.name,
        ownerid: req.user.id,
        parentid: parentFolderId,
      },
      include: {
        files: {
          select: {
            size: true
          },
        },
      },
    });

    return res.status(201).json({
      data: {
        message: `Folder: ${req.body.name} sucessfully created!`,
        status: 201,
        folderInfo: {
          name: createdFolder.name,
          createdat: createdFolder.createdat,
          updatedat: createdFolder.updatedat,
          id: createdFolder.id,
          files: createdFolder.files,
        },
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
    let parentFolderId = req.params.parentFolderId || req.user.folders[0].id;
    let folderId = req.params.folderId || undefined;
    if (!folderId) {
      throw new ErrorWithStatusCode("Folder Id was not sent in request!", 403);
    }
    folderId = Number(folderId);
    parentFolderId = Number(parentFolderId);

    const newName = req.body.name;

    const folder = await prisma.folder.findMany({
      where: {
        name: newName,
        ownerid: req.user.id,
        parentid: parentFolderId,
      },
    });
    if (folder.length !== 0) {
      throw new ErrorWithStatusCode(
        "Folder name already exists! Select a new folder name! ",
        409
      );
    }
    const updatedFolderInfo = await prisma.folder.update({
      where: {
        ownerid: req.user.id,
        id: Number(folderId),
      },
      data: {
        name: newName,
      },
      select: {
        updatedat: true,
        name: true,
      },
    });

    return res.status(201).json({
      data: {
        message: `Updated folder! Folder was renamed to ${newName}`,
        status: 201,
        folderInfo: {
          name: updatedFolderInfo.name,
          updatedat: updatedFolderInfo.updatedat,
        },
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
        select: {
          files: true,
          name: true,
          createdat: true,
          updatedat: true,
          id: true,
        },
      }),
      await prisma.file.findMany({
        where: {
          ownerid: req.user.id,
          folderid: folderId,
        },
        select: {
          name: true,
          createdat: true,
          updatedat: true,
          id: true,
          size: true,
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
