const otpValidator =  (req, res) => {
    if(!req.session.otp || !req.body.otp){
        return res.status(400).json({ text:"OTP not found" }).send();
    }
    if(req.session.otp == req.body.otp){
        res.status(200).json({ text:"OTP validate succes" }).send();
    }
    else{
        res.status(401).json({ text:"OTP invalid" }).send();
    }
}
module.exports = otpValidator;