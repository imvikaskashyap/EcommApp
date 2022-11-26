let express = require("express");
let productRouter = express.Router();
let productController = require("./../controller/product.controller");
let validator = require("./../middlewares/RequestValidator");
let authJwt = require("./../middlewares/auth.Jwt");
productRouter.get("/", [authJwt.VerifyToken], productController.getAllProducts);

productRouter.get(
  "/:productsId",
  [validator.validateReqforProductId],
  productController.getProductById
);
productRouter.put(
  "/:productsId",
  [validator.validateReqForProductName, validator.validateReqforProductId],
  productController.updateProductById
);

productRouter.post(
  "/",
  [validator.validateReqForProductName],
  productController.addNewProducts
);

productRouter.delete(
  "/:productsId",
  [validator.validateReqforProductId],
  productController.deleteProduct
);

module.exports = productRouter;
