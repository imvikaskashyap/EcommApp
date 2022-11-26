let express = require("express");
const path = require("path");
let router = express.Router();
let categoryRoutes = require("./categories.routes");
let productRoutes = require("./products.routes");
let authRoute = require("./auth.route");
let cartRoute = require("./cart.route");

// yaha hum routes bna rhe h

router.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname + "./../views/index.html"));
});

// This is for categories
router.use("/ECOMM/api/v1/categories", categoryRoutes);

// This is for products
//router.use('/products',productsRoutes)
router.use("/ECOMM/api/v1/products", productRoutes);
router.use("/ECOMM/api/v1/auth", authRoute);
router.use("/ECOMM/api/v1/cart", cartRoute);

module.exports = router;

// ECOMM/api/v1/categories/:categoryId
