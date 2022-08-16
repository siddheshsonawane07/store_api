const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "product name must be provided"],
  },
  price: { type: Number, required: [true, "product price must be provided"] },
  featured: { type: Boolean, default: false },
});
