const router = require("express").Router();
const userModel = require("../models/userModel");
const otpGenerator = require("../modules/otpGenerator");
const bcrypt = require("bcrypt");
const sendEMail = require("../modules/sendMail");

router.post("/signup", async (req, res) => {
    // if not any of this data incomplete
    if(!(req.body.username || req.body.name || req.body.phoneNumber || req.body.pincode || req.body.city || req.body.state || req.body.country || req.body.password || req.body.email)){
        return res.status(402).json({ data:"Data incoplete" }).send();
    }

    const salt = await bcrypt.genSalt();
    const newPassword = await bcrypt.hash(req.body.password, salt);

    const documentUser = {
        name:req.body.name,
        phoneNumber:req.body.phoneNumber,
        username:req.body.username,
        pincode:req.body.pincode,
        city:req.body.city,
        country:req.body.country,
        state:req.body.state,
        password: newPassword,
        email:req.body.email
    }

    userModel.create(documentUser)
    .then( async (doc) => {
        // otp created
        const otp = otpGenerator(); 
        const send = await sendEMail(otp, req.body.email);

        if(send){
            req.session.otp = otp;
            req.session.username = doc.username;
            req.session.save(() => {
                res.status(200).json({text:"Email send succes"}).send();
            });
        }
        else{
            return res.status(400).json({text:"Error occured"}).send();
        }
    })
    .catch((err) => {
        console.log("[*] User didn't save ", err);
        return res.status(405).json({ data:"Duplicate entry" , duplicates:err.keyPattern}).send();
    })
});

router.post("/varify", async (req, res) => {
    console.log(req.session, req.body.otp);

    if(req.session.otp != req.body.otp){
        return res.status(400).json({ data:"Not Varified " }).send();
    }
    try{
        const user = await userModel.findOne({ username:req.session.username });
        user.isVarified = true;
        user.save()
        .then(() => {
            return res.status(200).json({ data:"Varified" }).send();
        })
        .catch((err) => {
            console.log("[*] Server issue in saving varificarion ", err);
            return res.status(500).json({err}).send();
        })
        
    }
    catch(err){
        return res.status(500).json({ data:"some issue saving vairification", err }).send()
    }
})

router.get("/all", async(req, res) => {
    if(!req.session.isAdmin){
        return res.status(400).send("Not allowed");
    }
    const users = await userModel.find();
    if(!users){
        return res.status(500).send("some isssue")
    }
    res.status(200).send(users)
});

router.delete("/delete/:id", async(req, res) => {
    if(!req.session.isAdmin){
        return res.status(400).send("Not allowed");
    }
    const users = await userModel.findByIdAndDelete(req.params.id);
    if(!users){
        return res.status(500).send("some isssue")
    }
    res.status(200).send("succes");
});



module.exports = router;
