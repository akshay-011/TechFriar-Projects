import axios from 'axios';
import React, { useEffect, useState } from 'react'
import FloatingAlert from './FloatingAlert';

const PhoneOTP = () => {
    const [inputValues, setinputValues] = useState({
        phoneNumber:'',
        otp:''
    })
    const [validNum, setValidNum] = useState(false);
    const [validOTP, setValidOTP] = useState(false);

    const [otpSend, setOtpSend] = useState(false); 

    const [isLoading, setIsloading] = useState(false);

    const [floatingAlert, setFloatingAlert] = useState({
        show:false,
        text:'',
        color:''
    });

    useEffect(() => {
        if(inputValues.phoneNumber.length >= 11){
            setValidNum(true);
        }
        else{
            setValidNum(false)
        }
    }, [inputValues.phoneNumber])
    useEffect(() => {
        if(inputValues.otp.length === 6)
                setValidOTP(true);
        else{
            setValidOTP(false)
        }
    }, [inputValues.otp])

    // functions

    const inputHandler = (event) => {
        const { name, value } = event.target;
        setinputValues((values) =>({ ...values, [name]:value }))
    }

    const sendOTP = (event) => {
        event.preventDefault();
        setIsloading(true);
        setFloatingAlert({
            show:false,
            text:"",
            color:''
        });
        axios.post("http://localhost:9876/otp/phone", {phone:`+${inputValues.phoneNumber}`}, {withCredentials:true})
        .then((res) => {
            if(res.status ===200){
                setFloatingAlert({
                    show:true,
                    text:"OTP Send Success",
                    color:'green'
                });
                setIsloading(false)
                setOtpSend(true);
            }
        })
        .catch((err) => {
            setIsloading(false)
            setFloatingAlert({
                show:true,
                text:"Issue Occured",
                color:'red'
            });
        })
    }

    const validateOTP = (event) => {
        event.preventDefault();
        setIsloading(true)
        setFloatingAlert({
            show:false,
            text:"",
            color:''
        });
        axios.post("http://localhost:9876/otp/validate/", {...inputValues}, { withCredentials:true })
        .then((res) => {
                if(res.status === 200){
                    setIsloading(false)
                    setFloatingAlert({
                        show:true,
                        text:"Varified Succesfully",
                        color:'green'
                    });
                }
            }
        )
        .catch((err) => {
            if(err.response.status === 401){
                setFloatingAlert({
                    show:true,
                    text:"Varification Failed",
                    color:'red'
                });
                setIsloading(false)
            }
        })
    }

    if(otpSend){
        return(
            <div className='form-container' >
            { floatingAlert.show ? <FloatingAlert { ...floatingAlert } /> : false}

                <form>
                    <div className='form-input' >
                        <label>Enter OTP</label>
                        <input 
                            type='number'
                            name='otp'
                            value={inputValues.otp}
                            onChange={inputHandler}
                        />
                    </div>
                    <div className='notification'>
                        <p  
                            style={{
                                color:validOTP ? 'green' : 'red'
                            }}
                        >
                            Valid OTP
                        </p>
                    </div>
                    <div className='btn-container'>
                            <button 
                                onClick={validateOTP}
                                disabled={!validOTP || isLoading }
                                className='btn'
                            >
                                Validate
                            </button>
                    </div>
                </form>
            </div>
        )
    }

  return (
    <div className='form-container' >
        <form>
            <div className='form-input'>
                <label>Enter Phone Number </label>
                <input 
                    type='number'
                    name='phoneNumber'
                    placeholder='Phone Number with country code'
                    value={inputValues.phoneNumber}
                    onChange={inputHandler}
                />
            </div>
            <div className='notification'>
                <p  
                    style={{
                        color:validNum ? 'green' : 'red'
                    }}
                >
                    Valid Phone Number
                </p>
            </div>
                
            <div className='btn-container' > 
                    <button 
                        onClick={sendOTP}
                        className='btn'
                        disabled={!validNum || isLoading}
                    >
                        Send
                    </button>
            </div>

        </form>
    </div>
  )
}

export default PhoneOTP