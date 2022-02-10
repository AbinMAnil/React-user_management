const express = require("express");
const router = express.Router();

const {
  register,
  login,
  homePage,
  logout,
} = require("../controller/userController");
const { verifUser } = require("../middlewares/verfiUser");
const { checkAllField } = require("../middlewares/formValidation");

router.post("/register", checkAllField, register);
router.post("/login", login);
router.post("/home", verifUser, homePage);
router.post("/logout", verifUser, logout);

module.exports = router;
