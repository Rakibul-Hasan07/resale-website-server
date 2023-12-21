const express = require('express');
const { paymentInit, paymentSuccess, getDataByTransactionId, paymentFail } = require('../../controllers/payment');
const router = express.Router();


router.route('/payment/init').post(paymentInit)
router.route('/payment/success').post(paymentSuccess)
router.route('/payment/fail').post(paymentFail)
router.route('/get-data-transactionId/:id').get(getDataByTransactionId)

module.exports = router;