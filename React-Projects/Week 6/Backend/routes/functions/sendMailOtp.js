const generateOTP = require("./otpGenerator"); // importing otp generator
const nodemailer = require("nodemailer"); // import nodemailer

const sendMailOTP =  async (req, res) => {
    if(!req.body.email){
        return res.status(404).json({ text:"email not foud" }).send();
    }

    const transporter = await nodemailer.createTransport({
        host:'smtp.gmail.com',
        port:587,
        auth:{
            user:process.env.EMAIL,
            pass:process.env.PASSWORD
        }
    });
    const otp = generateOTP();

    transporter.sendMail({
        from:process.env.EMAIL,
        to:req.body.email,
        subject:'OTP Varification',
        text:`OTP Vrification`,
        html:`Your One Time Password is <b style="color:red;" >${otp}</b>`
    }).then((info) => {
        console.log(info);
        req.session.otp = otp;
        req.session.save(() => {
            res.status(200).json({info:info, text:"Email send succes"}).send();
        });
        
    })
    .catch((err) => {
        console.log("[*] Error in sending email ", err);
        res.status(400).json({info:err, text:"Error occured"}).send();
    })
}
module.exports = sendMailOTP;