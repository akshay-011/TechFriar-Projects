const twilio = require("twilio"); // import twilio

const generateOTP = require("./otpGenerator"); // importing otp generator
require("dotenv").config(); // configurin dotenv

const sendPhoneOTP = async (req, res) => {
    const client = new twilio(process.env.ACCID, process.env.AUTHTOKEN);
    const otp = generateOTP();
    client.messages
    .create({
        body:`Your OTP is ${otp}`,
        from:process.env.PHNNO,
        to:req.body.phone
    })
    .then((msg) => {
        console.log("[*]Phone sms otp send ", msg);
        req.session.otp = otp;
        req.session.save(() => {
            res.status(200).json({text:"OTP send"}).send();
        })
    })
    .catch((err) => {
        console.log("[*] Phone sms OTP failed " ,err);
        res.status(500).json({ text:'Some issue occured ' }).send();
    });
}

module.exports = sendPhoneOTP;