const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/register_categoryController");

router.get("/select_register_category", categoryController.catget);
router.post("/selected_categoryPost",categoryController.catpost);

module.exports = router;