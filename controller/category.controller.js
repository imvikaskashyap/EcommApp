let Categories = require("./../model/category");
let sequelizeInstance = require("./../config/db.config");

// async function createTable() {
// await sequelizeInstance.sync({ force: true });
// insertCategories();
// }

// let insertCategories = async () => {
//   await Categories.bulkCreate([
//     {
//       name: "Fashion",
//     },
//     {
//       name: "Mobile",
//     },
//     {
//       name: "Electronics",
//     },
//     {
//       name: "Appliances",
//     },
//   ]);
// };

let getAllCategories = async (req, res, next) => {
  let categories = await Categories.findAll();
  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(JSON.stringify(categories));
  res.end();
};

// UI => route => controller => model => sqlConnection
let getCategoryById = async (req, res, next) => {
  let categoryId = req.params.categoryId;
  let categories = await Categories.findByPk(categoryId);
  res.status(200).json(categories);
  res.end();
};

let addNewCategory = async (req, res, next) => {
  try {
    let categoryToAdd = req.body;
    await Categories.create(categoryToAdd);

    res.status(201).send("New Category added");
    res.end();
  } catch (err) {
    next(err);
  }
};

let deleteCategoryById = async (req, res, next) => {
  let id = req.params.categoryId;
  const category = await Categories.findByPk(id);
  try {
    if (!category) {
      // 2nd way to get error
      throw new Error("Category not found");
    }

    await Categories.destroy({
      where: {
        Id: id,
      },
    });
    res.status(200).send("Category deleted");
    res.end();
  } catch (err) {
    next(err);
  }
};

let updateCategoryById = async (req, res, next) => {
  let id = req.params.categoryId;
  let categoryToUpdate = {
    name: req.body.name,
    price: req.body.price,
  };

  await Categories.update(categoryToUpdate, {
    where: {
      Id: id,
    },
  });
  let updateCategory = await Categories.findByPk(id);
  res.status(200).send(updateCategory);
};

//createTable();
const all = {
  getAllCategories,
  getCategoryById,
  addNewCategory,
  deleteCategoryById,
  updateCategoryById,
};
module.exports = all;
