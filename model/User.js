let dbConnection = require("./../config/db.config");
const sequelize = require("sequelize");

let User = dbConnection.define("users", {
  // yaha hum sign up ke liye model bna rhe hain
  username: {
    type: sequelize.STRING,
  },
  email: {
    type: sequelize.STRING,
  },
  password: {
    type: sequelize.STRING,
  },
});

module.exports = User;
