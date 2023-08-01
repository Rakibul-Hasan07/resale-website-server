const { default: mongoose } = require("mongoose");

const bookingSchema = mongoose.Schema({
    name: String,
    email: String,
    productName: String,
    price: String,
    phone: String,
    place: String,
    date: String
})

const bookingModels = mongoose.model('bookings', bookingSchema)
module.exports = bookingModels;