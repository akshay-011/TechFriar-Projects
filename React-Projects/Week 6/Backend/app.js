const express = require("express"); // import express
const session = require("express-session"); // import session
const cors = require("cors"); // import cors
const otpVarification = require("./routes/otpVarification"); // importing routes
require("dotenv").config(); // configuring dotenv to acces .env file
const aadharValidator = require("./routes/adhaarVarify"); // immport aadhar varify
const mongoose = require("mongoose");
const sendMail = require("./routes/mainSend");

const app = express(); // initialise express app
const PORT = 9876; // setting port number

mongoose.connect(process.env.DBURL)
.then((res) => {
    console.log("[*] Connected to database");
})
.catch((err) => {
    console.log("[*] Failed to connect ", err);
})

app.use(express.json()); // json using
app.use(express.urlencoded({ extended:true })); // using urlencoder to acces post data
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
})); // using cors
app.use(session({
    secret: process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        secure:false,
        encode:true
    }
})); // using express-session


// adding route for otp
app.use("/otp", otpVarification); // added
app.use('/aadhar', aadharValidator) // added
app.use("/send", sendMail)

// app listening on port 
app.listen(PORT, () => {
    console.log(`[*] Listening on port ${PORT}`);
    console.log(`[*] Acces API in http://localhost:${PORT}/`);
});

