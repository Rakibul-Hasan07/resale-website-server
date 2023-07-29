const { default: mongoose } = require("mongoose");

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    url:  String ,
    role:  String
})

const userModels = mongoose.model("user", userSchema);
module.exports = userModels;