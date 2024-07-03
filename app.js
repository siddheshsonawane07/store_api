require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const connectDB = require("./db/connect");
const productsRouter = require("./routes/products");

app.use(express.json());
app.use(express.static("public"));

//routes

app.get("/", (req, res) => {
  res.send("index");
});

app.use("/api/v1/products", productsRouter);

//product route
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    //connect db
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is running at port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
