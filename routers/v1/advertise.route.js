const express = require('express')
const router = express.Router();
const { saveAdvertise, getAdvertise, getAdvertiseById } = require('../../Controllers/advertise')

router.post('/add-advertise', saveAdvertise)
router.get('/get-advertise', getAdvertise)
router.get('/details/:id', getAdvertiseById)
module.exports = router;