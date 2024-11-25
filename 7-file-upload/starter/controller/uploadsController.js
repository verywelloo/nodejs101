const path = require("path");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

// image already in req.files
const uploadProductImageLocal = async (req, res) => {
  if (!req.files) {
    throw new CustomError.BadRequestError("No File Uploaded");
  }

  const productImage = req.files.image;

  if (!productImage.mimetype.startsWith("image")) {
    throw new CustomError.BadRequestError("Please Upload Image");
  }

  const maxSize = 1024 * 1024;

  if (productImage.size > maxSize) {
    throw new CustomError.BadRequestError("Please upload image smaller 1KB");
  }

  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${productImage.name}`
  );

  await productImage.mv(imagePath); // move image from req.files to imagePath(upload folder in public file)
  return res
    .status(StatusCodes.OK)
    .json({ image: { src: `/api/v1/uploads/${productImage.name}` } });
};

const uploadProductImage = async (req, res) => {
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath, // path to image file + temp file name. tempFilePath comes with express-fileupload set to {useTempFiles}
    {
      use_filename: true, // option for use original file name
      folder: "file-upload", // option for store file in "file-upload" in cloudinary
    }
  );

  fs.unlinkSync(req.files.image.tempFilePath);

  res.status(StatusCodes.OK).json({ image: { src: result.secure_url } }); // secure_url is url of image on cloudinary
};

module.exports = {
  uploadProductImage,
};
