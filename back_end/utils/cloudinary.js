const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const fs = require("fs");
const { file } = require("../prisma-client/prismainstance");
const { error } = require("console");

const uploadOnCloudinary = async (localFilePath, username) => {
  let uploadedResult;
  try {
    uploadedResult = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: `dave-save/${username}`,
    });
  } catch (error) {
    console.error(error);
  } finally {
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
  }

  return uploadedResult;
};

const downloadFileCloudinary = async (url, outputPath) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Unable to retrieve resource: ${response.status}`);
    }
    const filestream = fs.createWriteStream(outputPath);
    await response.body.pipeTo(filestream);

    filestream.on("error", (err) => {
      console.error(`Error in writing file: ${err}`);
    });

    return filestream;
  } catch (error) {
    console.error(`Error in downloading file! ${error}`);
  }
};

const deleteOnCloudinary = async (publicID) => {
  await cloudinary.uploader.destroy(publicID, { invalidate: true });
};

module.exports = {
  uploadOnCloudinary,
  deleteOnCloudinary,
  downloadFileCloudinary,
};
