const express = require('express')
const router = express.Router();
const { verifyJWT, saveProducts, getProducts, deleteProducts } = require('../../Controllers/products')



router.post('/add-products', saveProducts)
router.get('/add-products', verifyJWT, getProducts)
router.delete('/add-products/:id', deleteProducts)
module.exports = router;