const mongoose = require("mongoose");

// vehicle schema
const vehicleSchema = new mongoose.Schema({
    name:String,
    description:String,
    price:Number,
    quantity:Number,
    // image wiil go here
    image:{
        type:String,
    }
})

module.exports = mongoose.model("Vehicle Model week8", vehicleSchema);