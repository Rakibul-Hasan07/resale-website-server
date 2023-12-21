const express = require('express')
const router = express.Router();
const { saveBookingsData, getBookingsData } = require('../../Controllers/bookings')

router.post('/bookings', saveBookingsData)
router.get('/bookings', getBookingsData)
module.exports = router;