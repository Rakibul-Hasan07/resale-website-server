const express = require('express')
const router = express.Router();
const { getProducts } = require('../../Controllers/recentProduct')

router.get('/recent-product', getProducts)

module.exports = router;