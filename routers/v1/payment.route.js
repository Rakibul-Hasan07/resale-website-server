const express = require('express')
const router = express.Router();
const paymentController = require('../../Controllers/payment')


router.route('/payment/init').post(paymentController.paymentInit)

module.exports = router;