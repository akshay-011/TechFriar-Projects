const mongoose = require('mongoose');

// schema creating
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
    },
    name:String,
    email:{
        type:String,
        unique:true
    },
    phoneNumber:{
        type:String,
        unique:true
    },
    pincode:Number,
    city:String,
    state:String,
    country:String,
    password:String,
    isAdmin:{
        type:Boolean,
        default:false
    },
    isVarified:{
        type:Boolean,
        default:false
    }
})

const userModel = mongoose.model('User collection', userSchema);

module.exports = userModel;