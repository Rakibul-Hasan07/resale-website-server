const express = require('express')
const router = express.Router();
const { saveBookingsData } = require('../../Controllers/bookings')

router.post('/bookings', saveBookingsData)
module.exports = router