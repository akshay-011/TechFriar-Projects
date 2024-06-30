const router = require("express").Router();
const vehicleModel = require("../models/vehicleModel");
const multer = require("multer");
require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET);


const fs = require('fs');

// Create the 'vehicle' directory if it doesn't exist
const uploadDirectory = './public/vehicle';

fs.mkdirSync(uploadDirectory, { recursive: true });


// creating disk storage for multer
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        return callback(null, "./public/vehicle");
    },
    filename: (req, file, callback) => {
        return callback(null, `${Date.now()}_${file.originalname}`)
    }
})

// setting a uplod this image
const uplod = multer({ storage });


// getting all vehicle list
router.get("/all", async (req, res) => {
    console.log(req.session);
    if(!(req.session.loggedIn || req.session.isAdmin)){
        return res.status(402).json({ data:"please login" }).send();
    }
    
    //fetching all vehicles data
    const vehicles = await vehicleModel.find();

    // if not vehicles some issue
    if(!vehicles){
        return res.status(500).json({ data:"No vehicle found server issue" }).send();
    }
    else
        res.status(200).send(vehicles);
    
})

router.post("/add", uplod.single('image') ,async (req, res) => {
    if(!req.session.loggedIn){
        return res.status(401).json({ data:'Unauthorized request' }).send();
    }
    const {name, description, price, quantity} = req.body;
    if(!(name || description || price || quantity || req.file.filename)){
        return res.status(400).json({ data:"Data incomplete" }).send();
    }
    vehicleModel.create({
        name:name,
        description:description,
        price:price,
        quantity:quantity,
        image:req.file.filename
    })
    .then(() => {
        return res.status(200).json({ data:"Vehcile added succesfully" }).send();
    })
    .catch((err) => {
        console.log("[*] Error occured ", err);
        return res.status(401).json({ data:"Error", error:err }).send();
    })
})

router.post("/update", async (req, res) => {
    if(!req.session.isAdmin){
        return res.status(402).json({data:"Unauthorized attempt"}).send();
    }
    const { _id, name, description, price, quantity } = req.body;

    try{    
        const vehicle = await vehicleModel.findById(_id );

        if(!vehicle){
            return res.status(404).json({ data:"Not Found" }).send();
        }  
        vehicle.name = name || vehicle.name;
        vehicle.description = description || vehicle.description;
        vehicle.price = price || vehicle.price;
        vehicle.quantity = quantity || vehicle.quantity;

        vehicle.save()
        .then(() => {
            return res.status(200).json({ data:"Update succesfull" }).send();
        })
        .catch((err) => {
            console.log("[*] Update failed ", err);
            return res.status(500).json({ data:"Update failed" }).send();
        })
    }
    catch(err){
        return res.status(404).json({ data:"Vehcle not found" }).send();
    }
});


router.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    console.log(id);
    if(!id){
        return res.status(400).json({ data:"No id found" }).send();
    }
    try{
        const user = await vehicleModel.findOneAndDelete({ _id:id });

        if(!user){
            return res.status(404).json({ data:"Vehicle Not found" }).send(); // send res
        }
        res.status(200).json({ data:"Vehicle removed" }).send();
    }
    catch(err){
        console.log("Error ", err);
        return res.status(500).json({ data:"Server error" }).send(); // send res
    }
})

// route for getting single vehicle
router.get("/get/:id", async (req, res) => {
    const vehicle = await vehicleModel.findById(req.params.id);
    if(vehicle){
        return res.status(200).send(vehicle);
    }
    else
        return res.status(404).send();
});

// make payment
router.post("/book", async (req, res) => {
    if(!req.session.loggedIn){
        return res.status(400).send('Login please');
    }
    const { _id, price, name } = req.body;

// Check if the product already exists in Stripe
let vehicleProduct;
try {
    vehicleProduct = await stripe.products.retrieve(_id);
} catch (error) {
    // If the product doesn't exist, create it
    if (error.code === 'resource_missing') {
        vehicleProduct = await stripe.products.create({
            name: name,
            id: _id
        });
    } else {
        // Handle other errors
        return res.status(500).send('Stripe error: ' + error.message);
    }
}
    // creating price for it
    const price_pay = await stripe.prices.create({
        product: vehicleProduct.id,
        unit_amount: 100 * price,
        currency: 'inr',
        nickname: 'Vehicle Price',
    })

    // Creating the Stripe checkout session
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price: price_pay.id,
                quantity: 1
            }
        ],
        mode: "payment",
        success_url: 'http://localhost:3000/vehicle/success/'+_id,
        cancel_url: 'http://localhost:3000/',
});

    res.json({ id:session.id }).send();
});

// updating booking
router.put("/book/:id", async (req, res) => {
    const id = req.params.id;

    const vehicle = await vehicleModel.findById(id);
    if(!vehicle){
        return res.status(404).send("Ambada kalla");
    }
    console.log(vehicle.quantity);
    vehicle.quantity = vehicle.quantity - 1;
    console.log(vehicle.quantity);
    vehicle.save()
    .then(() => {
        res.status(200).send("Updated");
    })
    .catch(() => {
        res.status(500).send();
    })
})
module.exports = router;