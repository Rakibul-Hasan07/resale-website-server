const { default: mongoose } = require("mongoose");

const categorySchema = mongoose.Schema({
    id: String,
    name: String
})

const categoryModels = mongoose.model("categorie", categorySchema);
module.exports = categoryModels;

