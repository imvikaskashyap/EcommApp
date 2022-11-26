const db = require("./../model/index");
const config = require("./../config/auth.config");
const jwt = require("jsonwebtoken"); // install via "npm i jsonwebtoken"
const bcrypt = require("bcryptjs"); // install via "npm i bcrypt"
const { Sequelize } = require("sequelize");
const { roles } = require("./../model/index");
const User = db.user;
const Roles = db.roles;

let signup = async (req, res) => {
  // const { username, email, password } = req.body;
  //console.log(username, email, password);
  let user = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  if (req.body.roles) {
    let roles = await Roles.findAll({
      where: {
        name: {
          [Sequelize.Op.or]: req.body.roles,
        },
      },
    });

    await user.setRoles(roles);
    res.status(200).json({
      //status: "Success",
      message: "User registered successfully",
      // data: user,
    });
    //res.end();
  } else {
    await user.setRoles([1]);
    res.status(200).json({
      message: "Registered with user role",
    });
  }
};

let signin = async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let userName = await User.findOne({
    where: {
      username: username,
    },
  });

  if (!userName) {
    res.status(404).json({
      message: "User not found",
    });
    return;
  }

  let isValidPassword = bcrypt.compareSync(password, userName.password);

  if (!isValidPassword) {
    res.status(404).json({
      message: "Password is invalid",
    });
    return;
  }

  var token = jwt.sign({ id: userName.id }, config.secret, {
    expiresIn: 86400, // 60*60*24
  });

  let authorities = [];
  let roles = await userName.getRoles();
  for (let i = 0; i < roles.length; i++) {
    authorities.push("ROLE_" + roles[i].name.toUpperCase());
  }

  res.status(200).send({
    id: userName.id,
    username: userName.userName,
    email: userName.email,
    roles: authorities,
    accessToken: token,
  });
};
module.exports = {
  signin,
  signup,
};
