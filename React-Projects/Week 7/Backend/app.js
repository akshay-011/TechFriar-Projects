const express = require("express");
require('dotenv').config();
const mongoose = require("mongoose"); 
const adminRoutes = require("./routes/adminRoutes");
const session = require("express-session");
const cors = require("cors");
const commonRoutes  =require("./routes/commonRoutes");
const vechicleRoute  = require("./routes/vehicleRoutes")
const userRoute = require("./routes/userRoutes")

// express initialising
const app = express();

app.use(express.urlencoded({ extended:true }));
app.use(session({
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:false
}));
app.use(express.json());

app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}));

app.use(express.static("public"));


app.use("/", commonRoutes);

// using adminRoutes
app.use("/admin", adminRoutes);

// vehicle routing
app.use('/vehicle', vechicleRoute);

//user routes
app.use("/user", userRoute);

// listening on port
app.listen(process.env.PORT, () => {
    console.log("[*] Server started.");
    console.log(`[*] http://localhost:${process.env.PORT}/`);
})

//mongo db connect
mongoose.connect(process.env.DB_URL)
.then(() => {
    console.log('[*] Database connection Succesfull');
})
.catch((err) => {
    console.log('[*] Database connection error ', err);
})