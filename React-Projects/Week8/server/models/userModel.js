const mongoose = require('mongoose');

// user history
const history = new mongoose.Schema({
    isBooked:Boolean,
    name:String,
    isCanceled:Boolean,
    booked_date:String,
    vehicle_id:String,
    description:String,
    price:Number
    
})

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
    },
    history:[history]

})

const userModel = mongoose.model('User collection week 8', userSchema);

module.exports = userModel;