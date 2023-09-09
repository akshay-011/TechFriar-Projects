const express = require("express"); // importing express

const mongoose = require("mongoose");

require('dotenv').config(); // configuring dotenv to ecces .env files

const UserModel = require("./database/UserSchema"); // importing UserModel

const app = express(); // initialising express server

app.set('view engine', 'ejs'); // setting ejs as view engine

app.use(express.static('static')); // using static folder to acces other files

app.use(express.urlencoded({ extended:true })); //using url encoder to acces post data
const PORT = 9876; // storing port number into a variable

mongoose.connect(process.env.URL) //connection to database
.then(() => {
    console.log("[*] Connected to databse"); // printing if connected
})
.catch((err) => {
    console.log("[*] Error occured " + err); // displaying if not connected
})

// home route
app.get("/", (req, res) => {
    res.render("home", {title:"Home"});
});

app.listen(PORT, () => {
    console.log("[*]Server started...");
    console.log(`[*] access site on  http://localhost:${PORT}/`);
})

