const express = require('express'); // import express
const validator = require("./functions/aadharValidator"); // import aadhar validator

const router = express.Router(); // initialising express router

router.post("/varify", async(req, res) => {
    const {number} = req.body;
    const ans = await validator(number);
    if(ans){
        res.status(200).json({ text:"Aadhar number valid" }).send();
    }
    else{
        res.status(400).json({ text:"Aadhar number not valid" }).send();
    }
})

module.exports = router;
