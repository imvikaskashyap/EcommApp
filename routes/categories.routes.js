let express = require("express");
let categoryRouter = express.Router();
let categoryController = require("../controller/category.controller");
let validator = require("./../middlewares/RequestValidator");

// Base route here is /categories
categoryRouter.get("/", categoryController.getAllCategories);

categoryRouter.get(
  "/:categoryId",
  [validator.validateReqforCategoryId],
  categoryController.getCategoryById
);

categoryRouter.put(
  "/:categoryId",
  [validator.validateReqForCategoryName],
  categoryController.updateCategoryById
);

categoryRouter.post(
  "/",
  [validator.validateReqForCategoryName],
  categoryController.addNewCategory
);

categoryRouter.delete(
  "/:categoryId",
  [validator.validateReqforCategoryId],
  categoryController.deleteCategoryById
);

module.exports = categoryRouter;
