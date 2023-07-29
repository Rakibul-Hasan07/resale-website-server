const express = require('express')
const router = express.Router();
const { saveUsers, getUsers, getSellers, deleteSeller, getBuyer, deleteBuyer, getJWT } = require('../../Controllers/users')

router.post("/users", saveUsers)
router.get('/users/:email', getUsers)
router.get('/seller', getSellers)
router.delete('/seller/:id', deleteSeller)
router.get('/buyer', getBuyer)
router.delete('/buyer/:id', deleteBuyer)
router.get('/jwt', getJWT)

module.exports = router;