const mongoose = require("mongoose");

const userSchema  = new mongoose.Schema({
    name:String,
    email:String,
    phoneNumber:String,
    adhaarNumber:String,
    dateOfBirth:String
});

const userModel = mongoose.model("User Model", userSchema);
module.exports = userModel;