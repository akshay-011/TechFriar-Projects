import axios from 'axios';
import React, { useState } from 'react'
import EmailValidation from './EmailValidation';
import OTPValidate from './OTPValidate';
import AdhaarValidator from './AdhaarValidator';
import PinCode from './PinCode';

const Registration = ({setAlert, setLoading}) => {
    const [inputValues, setInputValues] = useState({
        name:'',
        email:'',
        otp:''
    })

    const [emailValidated, setEmailValidated ] = useState(false);
    const [otpSend, setOtpSend] = useState(false);
    const [phoneValidated, setPhoneValidated] = useState(false);
    const [adhaarValidated, setAdhaarValidated] = useState(false);
    const [allDone, setAllDone] = useState(false);


    const inputHandler = (event) => {
        const { name, value } =  event.target;
        setInputValues((values) => ({ ...values, [name]:value }));
    }

    const validateEmail = (e) => {
        setLoading(true);
        setAlert({
            text:"",
            color:'',
            show:false
        });
        e.preventDefault();
        axios.post("http://localhost:9876/otp/email/", {email:inputValues.email}, {withCredentials:true})
        .then((res) => {
            setOtpSend(true);
            setAlert({
                text:"OTP send Succesfull",
                color:'green',
                show:true
            });
            setLoading(false);
        })
        .catch((err) => {
            setAlert({
                text:"OTP send Failed",
                color:'red',
                show:true
            });
            setLoading(false);
            console.log('Error sending otp ', err);
        })
    }

    const registrationComplete = () => {
        setLoading(true);
        axios.post("http://localhost:9876/send/email", {email:inputValues.email, name:inputValues.name}, {withCredentials:true})
        .then((res) => {
            setAlert({
                show:true,
                text:"Registration Complete",
                color:'green'
            });
            setAllDone(true)
            setLoading(false);
        })
        .catch((err) => {
            setAlert({
                show:true,
                text:"Registration Complete",
                color:'green'
            });
            setLoading(false);
            console.log("Err final ", err );
        })
    }
    
    if(allDone){
        return(
            <h1  
                style={{
                    color:'green'
                }}
            >Registration Complete</h1>
        )
    }
    
    if(emailValidated && phoneValidated && adhaarValidated){
       return(
        <PinCode complete={registrationComplete} setAlert={setAlert} />
       )
    }

    if(emailValidated && phoneValidated){
        return(
            <AdhaarValidator setAdhaarValidated={setAdhaarValidated} setAlert={setAlert} />
        )
    }
    if(otpSend){
        return(
            <OTPValidate emailValidated={emailValidated} setOtpSend={setOtpSend} setLoading={setLoading} setAlert={setAlert} setEmailValidated={setEmailValidated} setPhoneValidated={setPhoneValidated} />
        )
    }

    if(emailValidated){
        return(
            <EmailValidation setOtpSend={setOtpSend} setLoading={setLoading} setAlert={setAlert} />
        )
    }
    

    
  return (
    <div className='form-main' >
        <form>
            <div className='form-input'>
                <label>Name</label>
                <input 
                    name='name'
                    placeholder='Name'
                    value={inputValues.name}
                    onChange={inputHandler}
                />
            </div>

            <div className='form-input'>
                <label>Email</label>
                <input 
                    name='email'
                    placeholder='example@email.com'
                    value={inputValues.email}
                    onChange={inputHandler}
                />
            </div>

            <button 
                onClick={validateEmail}
            >
                Validate Email
            </button>
        </form>
    </div>
  )
}

export default Registration