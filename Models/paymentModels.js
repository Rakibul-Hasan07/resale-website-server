const mongoose = require("mongoose")

const PaymentSchema = mongoose.Schema({
    productName: String,
    price: Number,
    location: String,
    year: Number,
    transactionId: Number,
    paymentType: Boolean,
    _id: String,
    email: String,
    phone: Number
})

const paymentModels = mongoose.model("Payment", PaymentSchema)
module.exports = paymentModels;