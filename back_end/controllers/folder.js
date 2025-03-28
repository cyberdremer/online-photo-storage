const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const { folderValidation } = require("../validators/validators");
const cloudinary = require("cloudinary").v2;
const prisma = require("../prisma-client/prismainstance");

const createFolder = [
  folderValidation,
  asyncHandler(async (req, res, next) => {
    const parentFolderId = req.params.parentFolderId || req.user.rootFolderID;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: {
          messages: errors.array(),
          status: 400,
        },
      });
    }

    const folders = await prisma.folder.findUnique({
      where: {
        name: req.body.name,
        ownerid: req.user.id,
      },
    });

    if (folders) {
      return res.status(409).json({
        data: {
          message: "Folder already exists!",
          status: 409,
        },
      });
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
        message: `Folder: ${req.body.name}`,
        status: 201,
      },
    });
  }),
];

const deleteFolder = asyncHandler(async (req, res, next) => {
  const folderId = req.params.folderId || req.user.rootFolderID;
  const folder = await prisma.folder.findMany({
    where: {
      id: folderId,
      ownerid: req.user.id,
    },
    include: {
      subfolders: true,
      files: true,
    },
  });

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
});

const updateFolder = [
  folderValidation,
  asyncHandler(async (req, res, next) => {
    const folderId = req.params.folderId || req.user.rootFolderID;
    const newName = req.body.name;
    await prisma.folder.update({
      where: {
        ownerid: req.user.id,
        name: newName,
      },
    });

    return res.status(201).json({
      data: {
        message: "Updated folder!",
        status: 201,
      },
    });
  }),
];

const getFoldersAndFiles = asyncHandler(async (req, res, next) => {
  const folderId = req.params.folderId || req.user.rootFolderID;
  const [folders, files] = Promise.all([
    await prisma.folder.findMany({
      where: {
        ownerid: req.user.id,
        parentFolderId: folderID,
      },
    }),
    await prisma.file.findMany({
      where: {
        ownerid: req.user.id,
        folderid: folderID,
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
});

module.exports = {
  getFoldersAndFiles,
  createFolder,
  updateFolder,
  deleteFolder,
};
