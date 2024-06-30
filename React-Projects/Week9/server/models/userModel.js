const mongoose = require("mongoose");
const chatHistory = require("./chatHistory");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true
    },
    phoneNumber:{
        type:Number,
        unique:true,
        required:true
    },
    name:String,
    chatHistory:[chatHistory],
    userId:String,
    password:String
});

// middleware for custom id adding
userSchema.pre("save", function(next) {
    console.log(this.name);
    const prefix = process.env.PREFIX || "@chatapp.id"
    this.userId = `${this.phoneNumber}${prefix}`
    next()
});

const userModel = mongoose.model("user chatapp", userSchema);

module.exports = userModel;