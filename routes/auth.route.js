const controller = require("./../controller/auth.controller");
const express = require("express");
const app = express();
const verifySignUp = require("./../middlewares/VerifySignUp");
const router = express.Router();

// yaha hum sign up & sign in ke liye routes create kr rhe hain

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token,Origin,Content-Type,Accept"
  );
  next();
});

router.post(
  "/signup",
  [verifySignUp.checkDuplicateUserName, verifySignUp.checkRolesExisted],
  controller.signup
);
router.post("/signin", controller.signin);

module.exports = router;
