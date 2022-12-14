let sequelizeInstance = require("./../config/db.config");
let Products = require("./../model/product");
const Sequelize = require("sequelize");
//const { Sequelize } = require("sequelize");
const e = require("express");

// async function createTable() {
//   await sequelizeInstance.sync({ force: true });
//   insertProducts();
// }

let insertProducts = async (req, res, next) => {
  await Products.bulkCreate([
    {
      name: "Hrx",
      categoryId: 1,
      price: 18000,
    },
    {
      name: "Iphone 13",
      categoryId: 2,
      price: 60000,
    },
    {
      name: "Sony bravia",
      categoryId: 3,
      price: 40000,
    },
    {
      name: "Boat Rugged",
      categoryId: 4,
      price: 4000,
    },
    {
      name: "JBL Storm",
      categoryId: 5,
      price: 9000,
    },
    {
      name: "Vu 5",
      categoryId: 6,
      price: 32000,
    },
  ]);
  res.status(201).json({
    message: "Products added",
  });
};

let getAllProducts = async (req, res, next) => {
  let categoryId = req.query.categoryId;
  let minPrice = req.query.minPrice;
  let maxPrice = req.query.maxPrice;
  let products = [];
  if (Object.keys(req.query).length == 0) {
    products = await Products.findAll(categoryId);
  } else {
    if (categoryId && !(minPrice || maxPrice)) {
      products = await filterByCategory(categoryId);
    } else if (!categoryId && minPrice && maxPrice) {
      products = await filterByPriceRange(minPrice, maxPrice);
    } else {
      products = await Products.findAll({
        where: {
          categoryId: categoryId,
          price: {
            [Sequelize.Op.gte]: minPrice,
            [Sequelize.Op.lte]: maxPrice,
          },
        },
      });
    }
  }

  res.status(200).json(products);
  res.end();
};

let filterByCategory = async (categoryId) => {
  let filteredProducts = await Products.findAll({
    where: {
      categoryId: categoryId,
    },
  });

  return filteredProducts;
};

let filterByPriceRange = async (minPrice, maxPrice) => {
  let filteredProducts = await Products.findAll({
    where: {
      price: {
        [Sequelize.Op.gte]: minPrice,
        [Sequelize.Op.lte]: maxPrice,
      },
    },
  });

  return filteredProducts;
};

let getProductById = async (req, res, next) => {
  let id = req.params.productsId;
  if (!id) {
    res.status(400).send("ID not passed");
  }
  let products = await Products.findAll({
    where: {
      id: id,
    },
  });
  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(JSON.stringify(products));
  res.end();
};

let addNewProducts = async (req, res, next) => {
  try {
    let productToAdd = req.body;
    await Products.create(productToAdd);

    res.status(201).send("Category added");
  } catch (err) {
    next(err);
    res.status(400).send("Something went wrong");
  } finally {
    res.end();
  }
};

let deleteProduct = async (req, res, next) => {
  try {
    let id = req.params.productsId;
    await Products.destroy({
      where: {
        Id: id,
      },
    });
    res.status(410).send("Products deleted");
    res.end();
  } catch (err) {
    next(err);
  }
};

let updateProductById = async (req, res, next) => {
  if (!req.body.name) {
    res.status(500).send("Please enter Product name");
    res.end();
  }
  let id = req.params.productsId;
  let productTOUpdate = {
    name: req.body.name,
  };

  await Products.update(productTOUpdate, {
    where: {
      Id: id,
    },
  });
  let updateProduct = await Products.findByPk(id);
  res.status(201).send(updateProduct);
};

//createTable();
//deleteProduct();
const all = {
  getAllProducts,
  getProductById,
  addNewProducts,
  deleteProduct,
  updateProductById,
  insertProducts,
};
module.exports = all;
