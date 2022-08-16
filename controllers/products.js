const Product = require("../models/product");

const getAllproductsStatic = async (req, res) => {
  const product = await Product.find({});
  res.status(200).json({ product });
};

const getAllproducts = async (req, res) => {
  res.status(200).json({ msg: "product route" });
};

module.exports = {
  getAllproductsStatic,
  getAllproducts,
};
