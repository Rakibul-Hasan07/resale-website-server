const { default: mongoose } = require("mongoose");

const blogSchema = mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true }
})

const blogModels = mongoose.model("blog", blogSchema)
module.exports = blogModels;