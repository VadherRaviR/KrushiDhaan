const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const wrappAsync = require('../utils/wrapper');


router.get("/register",userController.user_reg_get);
router.post(
  "/register",
  wrappAsync(userController.user_reg_post)
);
router.get("/login", userController.user_login_get);
router.post(
  "/login",
    userController.user_login_post);

  module.exports = router;