const nodemailer = require("nodemailer");
require("dotenv").config();

// for sending mails
// const sendEMail = async (otp, email) => {
const  sendEMail = async (otp, email) => {
    
    // value will be returned
    let returnValue; 
    
    const transporter = nodemailer.createTransport({
        host:'smtp.gmail.com',
        port:587,
        auth:{
            user:process.env.EMAIL,
            pass:process.env.PASSWORD
        }
    });
    await transporter.sendMail({
        from:process.env.EMAIL,
        to:email,
        subject:'OTP Varification',
        text:`OTP Vrification`,
        html:`Your One Time Password is <b style="color:red;" >${otp}</b>`
    }).then((info) => {
        console.log(info);
        returnValue = true;
    })
    .catch((err) => {
        console.log("[*] Error in sending email ", err);
        returnValue = false;
    })

    return returnValue;
}
module.exports = sendEMail;