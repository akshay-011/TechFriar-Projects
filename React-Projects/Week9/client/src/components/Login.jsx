import React from 'react'
import useFormInputs from './hooks/useFormInputs'
import { Link } from 'react-router-dom';

function Login() {
    const [inputs, inputsHandler] = useFormInputs();
    console.log(inputs);
  return (
    <main className='fill-screen center-content' >
    <div className='fill-screen center-content gradient-color' ></div>
        <form className='form-container' >
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

            <div className='btn-container'>
                <button
                    className='btn'
                >
                    Log In
                </button>
            </div>
            <div className='link-text' >
                <Link className='link' to={"/signup"} >Don't have an account ?</Link>
            </div>
        </form>
    </main>
  )
}

export default Login