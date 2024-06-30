const router = require("express").Router();
const vehicleModel = require("../models/vehicleModel");
const multer = require("multer");
require('dotenv').config();
const userModel = require("../models/userModel");

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
    console.log(" booking starts");

    try {
        const vehicle = await vehicleModel.findById(id);
        if (!vehicle) {
            return res.status(404).send("Ambada kalla");
        }

        // Updating vehicle quantity
        vehicle.quantity = vehicle.quantity - 1;

        await vehicle.save();
        console.log("vehicle saved ", vehicle);

        // Updating user details
        console.log("user savin stats");
        const user = await userModel.findById(req.session.userId);
        if (!user) {
            return res.status(406).send("User not found");
        }

        console.log(new Date(time))
        const time = Date.now();

        // Saving into user history
        user.history.push({
            isBooked: true,
            isCanceled: false,
            booked_date: new Date(time),
            vehicle_id: vehicle._id,
            name: vehicle.name,
            description: vehicle.description,
            price:vehicle.price
        });

        await user.save();
        console.log("User saved ", user);

        res.status(200).send("Updated");
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("An error occurred");
    }
});


router.put("/cancel", async (req, res) => {
    const { id } = req.body; // vehicle id
    const userId = req.session.userId; // user id
    if(!req.session.loggedIn){
        return res.status(400).send("Not allowed");
    }

    const user = await userModel.findById(userId);

    if(!user){
        return res.status(404).send("user not found");
    }

    const history = user.history;

    const index = history.findIndex(item => item.vehicle_id === id);

    if(index === -1){
        return res.status(404).send("Not found in history")
    }
    
    history[index].isCanceled = true;
    await user.save();
    res.send('vehicle canceled waiting for admin');
});

router.put("/cancel_accept", async (req, res) => {
    const { vehicle_id, userId } = req.body;

    try{
        // updating quantity
        const vehicle = await vehicleModel.findById(vehicle_id);
        vehicle.quantity = vehicle.quantity + 1;
        await vehicle.save();
    
        // updating user
        const user = await userModel.findById(userId);
        console.log(req.session);
    
        const newHistory = user.history.filter(his => his.vehicle_id !== vehicle_id);
    
        user.history = newHistory;
        await user.save();
        res.status(200).send("update success");
    }
    catch(err){
        console.log("error ", err);
        res.status(500).send(err);
    }


})

module.exports = router;