const mongoose = require("mongoose"); // importing mongoose to connect to mongodb

const UserSchema = new mongoose.Schema({ // making a schema structure of collection
    username:{
        type:String,
        unique:true
    },
    password:String,
    fullName:String,
})

const model = mongoose.model('UserData', UserSchema); // creating this schema as a model
module.exports=model; // exporting model
