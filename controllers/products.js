const Product = require("../models/product");
// const {parse, stringify, toJSON, fromJSON} = require('flatted');

const getAllproductsStatic = async (req, res) => {
  const product = await Product.find({});
  res.status(200).json({ product });
};

const getAllproducts = async (req, res) => {
  const { featured, company, name, sort, fields } = req.query;
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
  //sort
  if (sort) {
    const sortlist = sort.split(",").join(" ");
    result = result.sort(sortlist);
  } else {
    result = result.sort("createdAt");
  }

  if (fields) {
    const fieldslist = fields.split(",").join(" ");
    result = result.select(fieldslist);
  }

  // console.log(result);
  const products = await result;
  res.status(200).json({ products, nHbits: products.length });
};

module.exports = {
  getAllproductsStatic,
  getAllproducts,
};
