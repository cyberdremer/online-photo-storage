const asyncHandler = require("express-async-handler");
const prisma = require("../prisma-client/prismainstance");
const {
  uploadOnCloudinary,
  deleteOnCloudinary,
} = require("../utils/cloudinary");
const upload = require("../middleware/multer");
const decodeFileName = require("../utils/decodefilename");

const uploadFile = [
  upload.single("file"),
  asyncHandler(async (req, res, next) => {
    const folderID = req.params.folderID || req.user.rootFolderID;
    const result = await uploadOnCloudinary(req.file.path);
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

const deleteFile = asyncHandler(async (req, res, next) => {
  const fileID = req.params.fileID;
  const fileToDelete = await prisma.file.findFirst({
    where: {
      id: fileID,
      ownerid: req.user.id,
    },
  });

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
});

const downloadFile = asyncHandler(async (req, res, next) => {});

module.exports = {
  uploadFile,
  deleteFile,
  downloadFile,
};
