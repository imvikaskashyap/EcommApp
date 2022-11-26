let express = require("express");
let bodyParser = require("body-parser");
let serverConfig = require("./config/server.config");
const router = require("./routes/index");
const ErrorHandler = require("./middlewares/ErrorHandler");
let dbConnection = require("./config/db.config");
let Category = require("./model/category");
let Products = require("./model/product");
let Roles = require("./model/Roles");
let app = express();
app.use(bodyParser.json());
app.use(router);
app.use(ErrorHandler);

Category.hasMany(Products);

let init = async () => {
  await dbConnection.sync({ force: true });
  insertCategories();
  insertRoles();
};

let insertCategories = async () => {
  await Category.bulkCreate([
    {
      name: "Fashion",
    },
    {
      name: "Mobile",
    },
    {
      name: "Electronics",
    },
    {
      name: "Appliances",
    },
  ]);
};

let insertRoles = async () => {
  await Roles.bulkCreate([
    {
      id: 1,
      name: "user",
    },
    {
      id: 2,
      name: "admin",
    },
  ]);
  console.log("Roles added");
};

app.listen(serverConfig.PORT, () => {
  console.log("server listening at port " + serverConfig.PORT);
  init();
});
