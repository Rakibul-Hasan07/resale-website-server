const express = require('express')
const router = express.Router();
const { category, categoryById } = require('../../Controllers/category')


router.get("/category", category)
router.get("/category/products/:id", categoryById)

module.exports = router;