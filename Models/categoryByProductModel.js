const { default: mongoose } = require("mongoose");

const categorieByProductsSchema = mongoose.Schema({
    categoryId: String,
    categoryProducts: Array,
})

const categoryByProductModel = mongoose.model("allproduct", categorieByProductsSchema)
module.exports = categoryByProductModel;