const { default: mongoose } = require("mongoose");

const recentProductsSchema = mongoose.Schema({
    productName: String,
    price: Number,
    rating: Number,
    image: String,
    description: String
})

const recentProductModels = mongoose.model("recentproducts", recentProductsSchema)
module.exports = recentProductModels;