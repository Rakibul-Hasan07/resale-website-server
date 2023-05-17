const express = require('express')
const router = express.Router();
const paymentController = require('../../controllers/payment')


router.route('/init').post(paymentController.paymentInit)

module.exports = router;