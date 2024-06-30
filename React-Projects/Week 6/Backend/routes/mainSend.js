const router = require('express').Router();
require("dotenv").config(); // configuring dotenv to acces .env file
const nodemailer = require("nodemailer");

router.post('/email', async(req, res) => {
    const {email, name} = req.body;
    const transporter = await nodemailer.createTransport({
        host:'smtp.gmail.com',
        port:587,
        auth:{
            user:process.env.EMAIL,
            pass:process.env.PASSWORD
        }
    });
    transporter.sendMail({
        from:process.env.EMAIL,
        to:email,
        subject:'Registration Completed',
        text:`Registration Completed`,
        html:`Welcome ${name}<br>
            You have succesfully registered to mywebsite.site
            <br>
            Thank You Registering 
        `
    }).then((info) => {
            res.status(200).json({info:info, text:"Email send succes"}).send();
    })
    .catch((err) => {
        console.log("[*] Error in sending email ", err);
        res.status(400).json({info:err, text:"Error occured"}).send();
    })
})

module.exports = router;