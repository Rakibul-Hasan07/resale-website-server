const { default: mongoose } = require("mongoose");

const bookingSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    phone: { type: Number, required: true },
    place: { type: String, required: true },
    date: { type: Number, required: true }
})

const bookingModels = mongoose.model('booking', bookingSchema)
module.exports = bookingModels;