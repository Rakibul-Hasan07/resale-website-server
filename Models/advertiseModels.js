const { default: mongoose } = require("mongoose");

const advertiseSchema = mongoose.Schema({
    productName: { type: String, required: true },
    email: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    quality: { type: String, required: true },
    phone: { type: Number, required: true },
    location: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    year: { type: Number, required: true }
})

const advertiseModels = mongoose.model('advertise', advertiseSchema)
module.exports = advertiseModels;