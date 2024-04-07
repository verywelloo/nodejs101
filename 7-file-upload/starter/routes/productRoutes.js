const express = require("express");
const router = express.Router();

const {
  createProduct,
  getAllProducts,
} = require("../controller/productController");
const { uploadProductImage } = require("../controller/uploadsController");

router.route("/").post(createProduct).get(getAllProducts);
router.route("/uploads").post(uploadProductImage);

module.exports = router;
