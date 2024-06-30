const router = require('express').Router(); 
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const sendEMail = require("../modules/sendMail");
const otpGenerator = require("../modules/otpGenerator");
const { route } = require('./userRoutes');


router.post("/login", async (req, res) => {
    if(req.session.loggedIn){
        return res.status(405).json({data:"Alread Logged in"}).send();
    }
    const user = await userModel.findOne({username:req.body.username});

    if(!user){
        // if not user found return error
        return  res.status(400).json({ data:"User not found"}).send();
    }

    // for admin login
    else if(user.isAdmin){
        const login = await bcrypt.compare(req.body.password, user.password);
        if(login){
            req.session.isAdmin = true;
            req.session.loggedIn = true;
            req.session.save(() => {
                return res.json({ data:"Admin login succes "+user.username, username:"Admin", isAdmin:true }).status(200).send();
            })
        }
        else{
            return res.status(402).json({ data:'Invalid password' }).send();
        }

    }
    // If not varified
    else if(!user.isVarified){
        const otp = otpGenerator(); 
        const send = await sendEMail(otp, req.body.email);
        
        if(send){
            req.session.otp = otp;
            req.session.username = doc.username;
            req.session.save(() => {
                res.status(200).json({info:"Not varified", text:"Email send succes", isAdmin:false}).send();
            });
        }
        else{
            return res.status(400).json({text:"Error occured", info:"Not varified"}).send();
        }
    }

    // Normal user login

    else{
        const login = await bcrypt.compare(req.body.password, user.password);
        user.password = "Enthey Mone 👌"
        if(login){
            req.session.loggedIn = true;
            req.session.save(() => {
                return res.status(200).json({ data:"login succes "+user.username, isAdmin:false, user }).send();
            });
        }
        else{
            return res.status(402).json({ data:'Invalid password', ...user }).send();
        }

    }
});

router.delete("/logout", async (req, res) => {
    req.session.destroy(() => {
        res.status(200).json({ data:"Logout succes" }).send();
    });

})


module.exports = router;