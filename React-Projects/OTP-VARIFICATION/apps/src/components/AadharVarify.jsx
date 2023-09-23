import axios from 'axios'
import React, { useState } from 'react'
import FloatingAlert from './FloatingAlert';

const AadharVarify = () => {
    const [number, setNumber] = useState('');
    const [floatingAlert, setFloatingAlert] = useState({
        show:false,
        text:'',
        color:''
    });
    const submit = (e) => {
        setFloatingAlert({
            show:false,
            color:'',
            text:""
        });
        e.preventDefault();

        axios.post("http://localhost:9876/aadhar/varify", { number:number }, {withCredentials:true})
        .then((res) => {
            setFloatingAlert({
                show:true,
                color:'green',
                text:"This Aadhar is valid"
            });
        })
        .catch(() => {
            setFloatingAlert({
                show:true,
                color:'red',
                text:"This Aadhar is not valid"
            });
        })
    }
  return (
    <div className='form-container' >
        <form>
        { floatingAlert.show ? <FloatingAlert { ...floatingAlert } /> : false }
            <div className='form-input'>
                <label>Enter Aadhar Number</label>
                <input 
                    type='number'
                    name='number'
                    placeholder='Aadhar number'
                    onChange={(event) => {
                        setNumber(event.target.value);
                    }}
                    value={number}
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

export default AadharVarify