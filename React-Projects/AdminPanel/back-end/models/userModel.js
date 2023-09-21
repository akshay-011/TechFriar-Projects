const mongoose = require("mongoose"); // import mongoose

const userSchema = new mongoose.Schema({ // creating schema for user
    username:{
        type:String,
        unique:true
    },
    name:String,
    email:{
        type:String,
        unique:true
    },
    password:String,
    phoneNumber:String,
    address:String
})

const userModel = mongoose.model("UserModel", userSchema); 
module.exports = userModel; // exporting model