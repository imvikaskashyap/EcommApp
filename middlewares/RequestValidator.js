const Categories = require("./../model/category");
const Products = require("./../model/product");

const validateReqForCategoryName = (req, res, next) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Category name is invalid or required",
    });
  }
  next();
};
const validateReqForProductName = (req, res, next) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Product name is invalid or required",
    });
  }
  next();
};

const validateReqforCategoryId = async (req, res, next) => {
  let categoryId = req.params.categoryId;
  if (categoryId) {
    let category = await Categories.findByPk(categoryId);
    if (!category) {
      res.status(400).send({
        message: "Category does not Exist",
      });
      return;
    }
    next();
  }
};
const validateReqforProductId = async (req, res, next) => {
  let productId = req.params.productsId;
  if (productId) {
    let product = await Products.findByPk(productId);
    if (!product) {
      res.status(400).send({
        message: "Category does not Exist",
      });
      return;
    }
    next();
  }
};

module.exports = {
  validateReqForCategoryName,
  validateReqforCategoryId,
  validateReqForProductName,
  validateReqforProductId,
};
