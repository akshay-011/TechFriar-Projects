const express = require("express"); // import express
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");

const router = express.Router();

// users show route
router.get("/show", async (req, res) => {
    if(req.session.isAdmin){
        try{
            const users = await userModel.find(); // getting user info
            if(users.length > 0){
                res.status(200).send(users);
            }

            else{
                return res.status(500).json({data:"Database Error"});
            }
        }
        catch(err){
            console.log("No Came try"); // if any error occured server error is showed
            console.log("[*] Error occured ");
            return res.status(500).json({ data:"Server error " }); // sending error
        }
    }
    else{
        return res.status(401).json({ data:"You are not admin" });
    }
});

// adding user
router.post("/add", async (req, res) => {
    if(!req.session.isAdmin){
        return res.status(401).json({data:"Not admin"}); // if not admin
    }
    const { username, password, name, email, phoneNumber, address} = req.body;
    if((!username || username.length <= 0) || (!password || password.length <= 0) || (!name || name.length <= 0) || (!email || email.length <= 0) || (!phoneNumber || phoneNumber.length <= 0) || (!address || address.length <= 0) ){
        console.log(req.body);
        return res.status(400).json({data:"Data incomplete or bad request"}).send();
    }
    else{
        const salt = await bcrypt.genSalt();
        const  newPassword = await bcrypt.hash(password, salt);
        userModel.create({
            username:username,
            name:name,
            email:email,
            phoneNumber:phoneNumber,
            address:address,
            password:newPassword
        })
        .then((doc) => {
            console.log("[*] Data added ", doc);
            return res.status(200).json({ data:"Added" }).send();
        })
        .catch((err) => {
            if(err.code === 11000){
                return res.status(409).json({ data:"Duplicate entry" }).send();
            }
            else{
                return res.status(500).json({ data:"Not added" }).send();
            }
        })
    }
});

router.put("/update/:id", async (req, res) => {
    const { username, name, email, phoneNumber, address} = req.body;
    console.log(req.body);
    const id = req.params.id;
    console.log( "Id  = " + id);
    try{ // trying to find user
        const user = await userModel.findById(id); // finding user
        if(!user){
            return res.status(404).json({ data:"user not found" }).send(); // seding  not found status code
        }
        // if the any change do it
        user.username = username || user.username;
        user.name = name || user.name;
        user.email = email || user.email;
        user.phoneNumber = phoneNumber || user.phoneNumber;
        user.address = address || user.address;

        user.save()
        .then(() => {
            res.status(200).json({ data:"Data modified" }).send(); // sending responce
        })
        .catch((err) => {
            if(err.code === 11000){
                return res.status(409).json({ data:"Duplicate entry" }).send();
            }
            else{
                return res.status(500).json({ data:"Not Modified" }).send();
            }
        })
        
    }
    catch(err){
        console.log(`[*] User ${id} not found `, err);
        return res.status(500).json({ data:"Server error" }).send();
    }
})

//delete user route
router.delete("/delete/:id", async (req, res) => {
    try{
        const user = await userModel.findOneAndDelete(req.params.id);

        if(!user){
            return res.status(404).json({ data:"user Not found" }).send(); // send res
        }
        res.status(200).json({ data:"User removed" }).send();
    }
    catch(err){
        console.log("Error ", err);
        return res.status(500).json({ data:"Server error" }).send(); // send res
    }
})
// get a single user
router.get("/get/:username", async (req, res) => {
    if(!req.session.isAdmin){
        res.status(401).send();
    }
    else{
        console.log(req.body.username);
        try{
            const user = await userModel.findOne({ username:req.params.username });
            if(user){
                res.status(200).json(user).send();
            }
            else{
                res.status(404).send();
            }
        }
        catch(err){
            console.log("[*] Error ", err);
            res.status(404).send();
        }
    }
})

module.exports = router;