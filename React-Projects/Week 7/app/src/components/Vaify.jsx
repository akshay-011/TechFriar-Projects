import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Vaify = ({ setAlert }) => {
    // otp value state
    const [otp, setOtp] = useState('');
    
    // nav for navigation
    const nav = useNavigate();

    // varification function
    const varify = (e) => {
        e.preventDefault();//preventing form submission

        setAlert({
            show:false,
            text:"",
            color:''
        });

        axios.post("http://localhost:9876/user/varify", {otp:otp}, { withCredentials:true })
        .then((res) => {
            setAlert({
                show:true,
                text:"OTP varified succes please login",
                color:'green'
            });
            nav("/login");
        })
        .catch((err) => {
            console.log(err);
            setAlert({
                show:true,
                text:"OTP Failed",
                color:"red"
            });
        })
    } 
  return (
    <div className='form-container' >
        <form className='main-form'>
            <div className='form-input' >
                <label>Confirm OTP</label>
                <input 
                    type='text'
                    name='otp'
                    value={otp}
                    onChange={(e) => {
                        setOtp(e.target.value);
                    }}
                />
            </div>
            <div className='btn-container'>
                    <button 
                        className='btn'
                        onClick={varify}
                    > 
                        Verify
                    </button>
            </div>
        </form>
    </div>
  )
}

export default Vaify