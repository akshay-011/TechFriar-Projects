import axios from 'axios';
import React, { useState } from 'react'

const OTPValidate = ({ 
    setEmailValidated, 
    setAlert, 
    setLoading, 
    setOtpSend, 
    setPhoneValidated, 
    emailValidated 
}) => {
    const [otp, setOtp] = useState('');

    const validateOTP = (e) => {
        setLoading(true);
        setAlert({
            show:false,
            text:"",
            color:''
        });
        e.preventDefault();
        axios.post("http://localhost:9876/otp/validate", { otp:otp }, { withCredentials:true })
        .then(() => {
            setAlert({
                show:true,
                text:"OTP Validation Succes",
                color:'green'
            });
            setLoading(false);
            if(emailValidated){
                setPhoneValidated(true);
            }
            else{
                setEmailValidated(true);
            }
            setOtpSend(false);
        })
        .catch((err) => {
            setAlert({
                show:true,
                text:"OTP Validation Failed",
                color:'red'
            });
            setLoading(false);
        })
    }

  return (
    <div className='form-main' >
        <form>
            <div className='form-input'>
                <label>Enter Otp</label>
                <input 
                    type='text'
                    name='otp'
                    placeholder='000000'
                    value={otp}
                    onChange={(e) => {
                        setOtp(e.target.value);
                    }}
                    autoFocus={true}
                />
            </div>

            <button
                onClick={validateOTP}
            >
                Next
            </button>
        </form>
</div>
  )
}

export default OTPValidate