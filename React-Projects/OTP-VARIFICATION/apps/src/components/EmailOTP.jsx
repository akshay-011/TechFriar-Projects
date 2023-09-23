import axios from 'axios';
import React, { useEffect, useState } from 'react'
import FloatingAlert from './FloatingAlert';

const EmailOTP = () => {

    const [inputValues, setinputValues] = useState({
        email:'',
        otp:''
    })

    const [floatingAlert, setFloatingAlert] = useState({
        show:false,
        text:'',
        color:''
    });

    const [validEmail, setValidEmail] = useState(false);
    const [validOTP, setValidOTP] = useState(false);

    const [otpSend, setOtpSend] = useState(false); 
    const [isLoading, setIsloading] = useState(false);

    useEffect(() => {
        if(inputValues.email.length > 5 && inputValues.email.includes('@') && inputValues.email.includes('.') )
            setValidEmail(true)
        else
            setValidEmail(false)
    }, [inputValues.email])

    useEffect(() => {
        if(inputValues.otp.length === 6)
                setValidOTP(true);
        else
            setValidOTP(false)
    }, [inputValues.otp])

    // functions

    const inputHandler = (event) => {
        const { name, value } = event.target;
        setinputValues((values) =>({ ...values, [name]:value }))
    }

    const sendOTP = (event) => {
        setFloatingAlert({
            show:false,
            text:"",
            color:''
        });
        setIsloading(true);
        event.preventDefault();
        axios.post("http://localhost:9876/otp/email", {email:inputValues.email}, {withCredentials:true})
        .then((res) => {
            if(res.status ===200){
                setFloatingAlert({
                    show:true,
                    text:"OTP Send Success",
                    color:'green'
                });
                setOtpSend(true);
                setIsloading(false);
            }
        })
        .catch((err) => {
            setIsloading(false);
            setFloatingAlert({
                show:true,
                text:"Issue Occured",
                color:'red'
            });
        })
    }

    const validateOTP = (event) => {
        setIsloading(true);
        event.preventDefault();
        setFloatingAlert({
            show:false,
            text:"",
            color:''
        });
        axios.post("http://localhost:9876/otp/validate/", {...inputValues}, { withCredentials:true })
        .then((res) => {
                if(res.status === 200){
                    setIsloading(false);
                    setFloatingAlert({
                        show:true,
                        text:"Varified Succesfully",
                        color:'green'
                    });
                }
            }
        )
        .catch((err) => {
            setIsloading(false);
            if(err.response.status === 401){
                setFloatingAlert({
                    show:true,
                    text:"Varification Failed",
                    color:'red'
                });
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
                <label>Enter Email</label>
                <input 
                    type='email'
                    name='email'
                    placeholder='name@host'
                    value={inputValues.email}
                    onChange={inputHandler}
                />
            </div>
            <div className='notification'>
                <p  
                    style={{
                        color:validEmail ? 'green' : 'red'
                    }}
                >
                    Valid Email
                </p>
            </div>
                
            <div className='btn-container' > 
                    <button 
                        onClick={sendOTP}
                        className='btn'
                        disabled={!validEmail || isLoading }
                    >
                        Send
                    </button>
            </div>

        </form>
    </div>
  )
}

export default EmailOTP