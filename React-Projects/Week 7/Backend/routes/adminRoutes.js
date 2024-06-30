// initialising router
const router = require('express').Router(); 
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");

router.post("/add", async (req, res) => {
    // if not data get send error
    if(!req.body.username || !req.body.password){
        return res.json({ data:"Admin add fail no data" }).status(400).send();
    }
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(req.body.password, salt);
    userModel.create({
        username:req.body.username,
        password:password
    })
    .then((doc) => {
        console.log('[*] Admin added ', doc);
        return res.json({ data:"admin added succes" }).status(200).send();
    })
    .catch((err) => {
        console.log("[*] Admin add failed ", err);
        return res.json({ data:"Some issue occured ", err }).status(500).send();
    })
})



module.exports = router;