const mongoose = require("mongoose"); // import mongoose

const adminSchema = new mongoose.Schema({ // schema for admin
    username:{
        type:String,
        unique:true // setting as unique username
    },
    password:String,
    isAdmin:{
        type:Boolean,
        default:true
    }
})

const adminModel = mongoose.model("AdminModel", adminSchema);
module.exports = adminModel;