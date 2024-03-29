const SSLCommerzPayment = require('sslcommerz-lts')
const store_id = process.env.STORE_ID
const store_passwd = process.env.STORE_PASSWORD
const is_live = false //true for live, false for sandbox
const paymentModel = require('../Models/paymentModels')

const paymentInit = async (req, res) => {
    const { payData } = req.body;
    if (!payData) {
        return res.status(400).json({ error: 'payData is required in the request body.' });
    }

    const paymentData = new paymentModel(payData);
    console.log(paymentData)

    //console.log(store_id, store_passwd)
    //sslcommerz init

    const data = {
        total_amount: parseFloat(paymentData.price),
        currency: "BDT",
        tran_id: paymentData.transactionId, // use unique tran_id for each api call
        success_url: `https://resale-website-server.vercel.app/api/v1/payment/success?transactionId=${paymentData?.transactionId}`,
        fail_url: `https://resale-website-server.vercel.app/api/v1/payment/fail?transactionId=${paymentData?.transactionId}`,
        cancel_url: 'http://localhost:3000/cancel',
        ipn_url: 'http://localhost:3000/ipn',
        shipping_method: 'Courier',
        product_name: paymentData.productName,
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: 'Customer Name',
        cus_email: paymentData.email,
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: paymentData.location,
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: paymentData.phone,
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };
    // console.log(data)
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
    sslcz.init(data).then(apiResponse => {
        // Redirect the user to payment gateway
        let GatewayPageURL = apiResponse.GatewayPageURL
        paymentData.save();
        res.send(GatewayPageURL)
    });
}

const paymentSuccess = async (req, res) => {
    console.log(req.query)
    try {
        const { transactionId } = req.query;
        const findProduct = await paymentModel.findOne({ transactionId: transactionId });
        await paymentModel.updateOne(
            { transactionId: transactionId },
            { $set: { paymentType: true, paidAt: new Date() } }
        );
        res.redirect(
            `https://resale-product.vercel.app//payment/success?transactionId=${transactionId}`
        );
    } catch (error) {
        res.status(500).send({ error: " server error" });
    }
}

const getDataByTransactionId = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await paymentModel.findOne({ transactionId: id });
        res.status(200).json({
            result: data,
            message: "success",
        });
    } catch (err) {
        res.status(500).json({
            message: "server error",
        });
    }
}

const paymentFail = async (req, res) => {
    const { transactionId } = req.query;
    await Payment.deleteOne({ transactionId: transactionId });
    // console.log(transactionId);
    res.redirect(
        `https://resale-product.vercel.app//payment/fail?transactionId=${transactionId}`
    );
}
module.exports = { paymentInit, paymentSuccess, getDataByTransactionId, paymentFail }