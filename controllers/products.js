const Product = require("../models/product");

const getAllproductsStatic = async (req, res) => {
  const product = await Product.find({});
  res.status(200).json({ product });
};

const getAllproducts = async (req, res) => {
  const { featured } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  console.log(queryObject);
  const products = await Product.find(queryObject);
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
  getAllproductsStatic,
  getAllproducts,
};
