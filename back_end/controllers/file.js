const asyncHandler = require("express-async-handler");
const prisma = require("../prisma-client/prismainstance");
const {
  downloadFileCloudinary,
  uploadOnCloudinary,
  deleteOnCloudinary,
} = require("../utils/cloudinary");
const upload = require("../middleware/multer");
const { fileValidation } = require("../validators/validators");
const decodeFileName = require("../utils/decodefilename");
const passport = require("passport");
const { validationResult } = require("express-validator");
const ErrorWithStatusCode = require("../classes/error");
const fs = require("fs");

const uploadFile = [
  passport.authenticate("jwt", { session: false }),
  upload.single("uploadedFile"),
  asyncHandler(async (req, res, next) => {
    if (!req.file) {
      throw new ErrorWithStatusCode(
        "File not attached, please upload a file!",
        413
      );
    }
    const folderID = Number(req.params.folderId) || req.user.folders[0].id;
    const result = await uploadOnCloudinary(req.file.path, req.user.username);
    await prisma.file.create({
      data: {
        name: decodeFileName(req.file.originalname),
        folderid: folderID,
        mimetype: req.file.mimetype,
        cloudinarypublicid: result.public_id,
        url: result.url,
        ownerid: req.user.id,
        size: req.file.size,
      },
    });

    res.status(201).json({
      data: {
        message: `${req.file.originalname} has been uploaded!`,
        status: 201,
      },
    });
  }),
];

const deleteFile = [
  passport.authenticate("jwt", { session: false }),
  asyncHandler(async (req, res, next) => {
    const fileID = Number(req.params.fileId);
    const fileToDelete = await prisma.file.findFirst({
      where: {
        id: fileID,
        ownerid: req.user.id,
      },
    });

    if (!fileToDelete) {
      throw new ErrorWithStatusCode("File to delete does not exist!", 404);
    }

    await deleteOnCloudinary(fileToDelete.cloudinarypublicid);

    await prisma.file.delete({
      where: {
        id: fileID,
        ownerid: req.user.id,
      },
    });

    return res.status(201).json({
      data: {
        message: `${fileToDelete.name} has been succesfully deleted!`,
        status: 201,
      },
    });
  }),
];

const downloadFile = [
  passport.authenticate("jwt", { session: false }),
  asyncHandler(async (req, res, next) => {
    const fileId = Number(req.params.fileId);
    const fileToDownload = await prisma.file.findFirst({
      where: {
        id: fileId,
        ownerid: req.user.id,
      },
    });

    const outputPath = `./public/downloads/${Date.now() + fileToDownload.name}`;

    fs.mkdir(`./public/downloads/`, (err) => {
      if (err) {
        console.log(`Directory already exists!`);
      }
    });

    const outputStream = await downloadFileCloudinary(
      fileToDownload.url,
      outputPath
    );

    outputStream.on("finish", () => {
      res.download(outputPath, fileToDownload.name, (err) => {
        if (err) {
          next(new ErrorWithStatusCode(err.message, 500));
        }
        fs.unlink(outputPath, (fileErr) => {
          if (fileErr) {
            console.error("Could not delete file");
          }
        });
      });
    });
  }),
];

const updateFileName = [
  passport.authenticate("jwt", { session: false }),
  fileValidation,
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ErrorWithStatusCode(errors.array(), 409);
    }
    const fileId = Number(req.params.fileId);
    const parentId = Number(req.params.folderId) || req.user.folders[0].id;

    const file = await prisma.file.findFirst({
      where: {
        folderid: parentId,
        name: req.body.name,
        ownerid: req.user.id,
      },
    });

    if (file) {
      throw new ErrorWithStatusCode(
        "File with that name already exists in this directory! Please choose a different name!",
        409
      );
    }

    const createdFile = await prisma.file.update({
      where: {
        ownerid: req.user.id,
        id: fileId,
        folderid: parentId,
      },
      data: {
        name: req.body.name,
      },
    });

    return res.status(201).json({
      data: {
        message: `File name has been updated to: ${createdFile.name}`,
        status: 201,
      },
    });
  }),
];

module.exports = {
  uploadFile,
  deleteFile,
  downloadFile,
  updateFileName,
};
