const express  = require("express"); // import express

const router = express.Router(); // initialising router
const sendMailOTP = require("./functions/sendMailOtp");
const otpValidator = require("./functions/otpValidation");
const sendPhoneOTP = require("./functions/sendPhoneOTP");

router.post('/email', sendMailOTP); // mail send route

router.post("/validate", otpValidator); // validator route

router.post("/phone", sendPhoneOTP); // otp send

module.exports = router;