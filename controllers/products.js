const Product = require("../models/product");

const getAllproductsStatic = async (req, res) => {
  const product = await Product.find({});
  res.status(200).json({ product });
};

const getAllproducts = async (req, res) => {
  const { featured, company, name, sort } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  // console.log(queryObject);
  let result = Product.find(queryObject);
  if (sort) {
   let sortlist = sort.split(',').join(' ');
   result = result.sort(sortlist);
  }
  else{
    result = result.sort('createdAt');
  }
  const products = result;
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
  getAllproductsStatic,
  getAllproducts,
};
