const mongoose = require("mongoose");

const chatHistory = new mongoose.Schema({
    senderId:mongoose.Schema.ObjectId,
    timestamp:Date,
    message:String
})

module.exports = chatHistory;