const express = require("express");
const router = express.Router();

const {createCategory,getAllCategories,categoryDetails} = require("../controllers/categoryController");

router.post("/create-category",createCategory);
router.get("/getAllCategories",getAllCategories);
router.get("/categoryDetails/:categoryId",categoryDetails);


module.exports = router;