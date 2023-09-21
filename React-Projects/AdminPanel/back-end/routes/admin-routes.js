// this file is for all routes for admin

const express = require("express"); // express import
const adminModel = require("../models/adminModel"); // import adminModel
require("dotenv").config();// configuring dotenv to acces .env file
const bcrypt = require("bcrypt"); // import bcrypt

const router = express.Router(); // router initialising

// admin home
router.get("/", (req, res) => {
    if(req.session.isAdmin){
        res.status(200).send("You are admin"); // if admin pass
    }
    else{
        res.send(401).send("Unauthorized entry");
    }
});

// for adding admin
router.post("/add", async (req, res) => {
    const { username, password } = req.body; 
    
    const salt = await bcrypt.genSalt(); // generating salt

    const hashedPassword = await bcrypt.hash(password, salt);

    adminModel.create({ // admin model saving
        username:username,
        password:hashedPassword
    }).then((doc) => {
        console.log("[*] Data added ", doc);
        return res.status(200).json({ data:"Added" }).send();
    })
    .catch((err) => {
        if(err.code === 11000){
            return res.status(409).json({ data:"Duplicate entry" }).send();
        }
        else{
            return res.status(500).json({ data:"Not added" });
        }
    })
    
});

// admin login
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await adminModel.findOne({username:username});
    if(user){
        const result = await bcrypt.compare(password, user.password);

        if(result){ // the password is same
            req.session.isAdmin = true; // make is admin true
            req.session.userId = user._id; // get user data
            req.session.save(() => {
                res.status(200).json(user).send(); 
            })
        }
        else{
            res.status(401).json({ data:"Password error" }).send(); // send password error
        }
    }
    else{
        res.status(404).json({ data:"Username not found" }).send(); // if no user found send 404 error
    }
});

// logout
router.delete("/logout", (req, res) => {
    if(req.session.isAdmin){    // if is logged in and admin
        req.session.destroy((err) => { // destroy session
            if(err)
                return res.status(500).json({ data:"Server error failed to login" }).send();
        })

        return res.status(200).json({ data:"Logged out" }).send(); // succes
    }
    else{
        return res.status(401).json({ data:"Unauthorized" }).send();
    }
});

module.exports = router; // exporting router
