import React, { useEffect, useState } from 'react'
import useFormInputs from './hooks/useFormInputs'
import { Link } from 'react-router-dom';
import addWarning from './modules/addWarning';
import removeWarning from './modules/removeWarning';
import axios from 'axios';

const SignUp = () => {
    const [inputs, inputsHandler] = useFormInputs();
    const [alertNames, setAlertNames] = useState([]);

    // confirm password check state
    useEffect(() => {
        if(inputs.password !== inputs.confPassword && inputs.confPassword.length > 0){
            return addWarning('confPassword');
        }
        removeWarning("confPassword");
    }, [inputs.confPassword, inputs.password]);

    // function for submitting
    const signup = (e) => {
        setAlertNames([]);
        e.preventDefault();
        // checking if form data is valid and adding warnings
        const newAlertNames = Object.values(inputs).filter(value => value.length <= 2);
        setAlertNames(newAlertNames);
        if(newAlertNames.length === 0){
            axios.post("http://localhost:9876/user/signup", inputs,{
                withCredentials:true
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }

    // useEffect to add warning into alerNames
    // useEffect(() => {
    //     if (alertNames.length > 0) {
    //       alertNames.forEach(value => addWarning(value));
    //     }
    //   }, [alertNames]);

    // // removing alerts
    // useEffect(() => {
    //     alertNames.forEach(value => removeWarning(value));
    //     setAlertNames([]);
    // }, [inputs]);

  return (
    <div className='fill-screen center-content' >
    <div className='fill-screen center-content gradient-color' ></div>
        <form className='form-container'>
            <div className='form-input'>
                <label className='form-label'>
                    Full Name
                </label>
                <input 
                    className='input-field'
                    type='text'
                    name='name'
                    value={inputs.name}
                    onChange={inputsHandler}
                    placeholder='Bob marly'
                />
            </div>

            <div className='form-input'>
                <label className='form-label'>
                    Username
                </label>
                <input 
                    className='input-field'
                    type='text'
                    name='username'
                    value={inputs.username}
                    onChange={inputsHandler}
                    placeholder="bob-123"
                />
            </div>

            <div className='form-input'>
                <label className='form-label'>
                    Phone Number
                </label>
                <input 
                    className='input-field'
                    type='number'
                    name='phoneNumber'
                    value={inputs.phoneNumber}
                    onChange={inputsHandler}
                    placeholder='9876543210'
                />
            </div>

            <div className='form-input'>
                <label className='form-label'>
                    Password
                </label>
                <input 
                    className='input-field'
                    type='password'
                    name='password'
                    value={inputs.password}
                    onChange={inputsHandler}
                    placeholder='**********'
                />
        </div>

        <div className='form-input'>
            <label className='form-label'>
                Confirm Password
            </label>
            <input 
                className='input-field'
                type='password'
                name='confPassword'
                value={inputs.confPassword}
                onChange={inputsHandler}
                placeholder='**********'
            />
            </div>
            <div className='btn-container'>
                <button
                    className='btn'
                    onClick={signup}
                >
                    Sign Up
                </button>
            </div>
            <div className='link-text' >
                <Link className='link' to={"/login"} >Already have an account ?</Link>
            </div>
        </form>
    </div>
  )
}

export default SignUp