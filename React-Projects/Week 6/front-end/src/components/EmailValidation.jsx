import axios from 'axios';
import React, { useState } from 'react';

const EmailValidation = ({setAlert, setLoading, setOtpSend}) => {
    const [inputValues, setInputValues] = useState({
        phone:'+91',
    })


    const inputHandler = (event) => {
        const { name, value } =  event.target;
        setInputValues((values) => ({ ...values, [name]:value }));
    }

    const sendOtp = (e) => {
        e.preventDefault();
        setLoading(true);
        axios.post("http://localhost:9876/otp/phone", {phone:inputValues.phone}, {withCredentials:true})
        .then(() => {
            setAlert({
                show:true,
                text:"OTP send succesfull",
                color:'green'
            });
            setLoading(false);
            setOtpSend(true)
        })
        .catch((err) => {
            setAlert({
                text:"OTP send Failed",
                color:'red',
                show:true
            });
            console.log('Error sending otp ', err);
        })
    }

  return (
    <div className='form-main' >
        <div className='form-input'>
            <label>Phone Number</label>
            <input 
                name='phone'
                placeholder='+91'
                value={inputValues.phone}
                onChange={inputHandler}
            />
        </div>
        <button 
            onClick={sendOtp}
        >
            Validate
        </button>
    </div>
  )
}

export default EmailValidation