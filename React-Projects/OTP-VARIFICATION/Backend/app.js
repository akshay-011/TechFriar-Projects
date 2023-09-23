const express = require("express"); // import express
const session = require("express-session"); // import session
const cors = require("cors"); // import cors
const otpVarification = require("./routes/otpVarification"); // importing routes
require("dotenv").config(); // configuring dotenv to acces .env file
const aadharValidator = require("./routes/adhaarVarify"); // immport aadhar varify

const app = express(); // initialise express app
const PORT = 9876; // setting port number

app.use(express.json()); // json using
app.use(express.urlencoded({ extended:true })); // using urlencoder to acces post data
app.use(cors({ origin:'http://localhost:3000', credentials:true })); // using cors
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

// app listening on port 
app.listen(PORT, () => {
    console.log(`[*] Listening on port ${PORT}`);
    console.log(`[*] Acces API in http://localhost:${PORT}/`);
});

