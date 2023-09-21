const express = require("express"); // import express
const session = require("express-session"); // session import
require('dotenv').config(); // configuring dotenv to acces .env file
const mongoose = require("mongoose"); // import mongoose
const cors = require('cors'); // import cors

const adminRoute = require("./routes/admin-routes"); // import admin routes
const userRoute = require("./routes/user-routes"); // import user routes

const app = express(); // app initialising
app.use(session({    // using session
    secret: process.env.SECRET,
    saveUninitialized:false,
    resave:true,
    cookie : {
        secure:false        
    }
})); 

app.use(express.urlencoded({ extended:true })); // to acces post data
app.use(express.json()); // to manipulate json data
app.use(cors({origin:'http://localhost:3000', credentials:true })); // using cors

mongoose.connect(process.env.DB_URL)
.then(() => {
    console.log("[*] Connected to database]");
})
.catch((err) => {
    console.log("[*] Error occured " + err);
})

app.use('/admin', adminRoute); // for admin routes
app.use("/user", userRoute); // for all user acces

// app.listening on PORT
app.listen(process.env.PORT, () => {
    console.log("[*] API started");
    console.log(`[*] Acces api in http://localhost:${process.env.PORT}`);
});