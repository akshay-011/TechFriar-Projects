import axios from 'axios';
import React, { useState } from 'react'

const AdhaarValidator = ({setAlert, setAdhaarValidated}) => {
    const [number, setNumber] = useState('');
    const submit = (e) => {
        setAlert({
            show:false,
            color:'',
            text:""
        });
        e.preventDefault();

        axios.post("http://localhost:9876/aadhar/varify", { number:number }, {withCredentials:true})
        .then((res) => {
            setAlert({
                show:true,
                color:'green',
                text:"This Aadhar is valid"
            });
            setAdhaarValidated(true);
        })
        .catch(() => {
            setAlert({
                show:true,
                color:'red',
                text:"This Aadhar is not valid"
            });
        })
    }
  return (
    <div className='form-main' >
        <form>
            <div className='form-input'>
                <label>Enter Aadhar Number</label>
                <input 
                    type='number'
                    name='number'
                    placeholder='Aadhar Number'
                    onChange={(event) => {
                        setNumber(event.target.value);
                    }}
                    value={number}
                    autoFocus={true}
                />
            </div>
            <br />
            <div className='btn-container' > 
                    <button 
                        className='btn'
                        onClick={submit}
                    >
                        Validate
                    </button>
            </div>

        </form>
    </div>
  )
}

export default AdhaarValidator