import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Alert from './Alert';
import PostOffice from './PostOffice';

const PincodeFinder = () => {
    const [inputValues, setinputValues] = useState({
        pincode:''
    })

    const [alert, setAlert] = useState({
        show:false,
        text:'',
        color:''
    })

    const [offices, setOffices] = useState(null);

    const [validPincode, setValidPincode] = useState(false);

    const inputHandler = (event) => {
        const {name, value} = event.target;
        setinputValues((values) => ({...values, [name]:value}));
    }

    useEffect(() => {
        setValidPincode(inputValues.pincode.length === 6 && parseInt(inputValues.pincode[0]) !== 0 );
    }, [inputValues]);

    const checkPincode = (e) => {
        setAlert({
            show:false,
            color:'',
            text:""
        })
        e.preventDefault();
        axios.get("https://api.postalpincode.in/pincode/"+inputValues.pincode)
        .then((res) => {
            console.log(res.data[0].PostOffice);
            setOffices(res.data[0].PostOffice)
            if(res.data[0].PostOffice === null){
                setAlert({
                    show:true,
                    color:'red',
                    text:"No records found"
                })
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

  return (
        <div className='form-container' >
            <form>
                <div className='form-input'>
                    <label>Pincode</label>
                    <input 
                        name='pincode'
                        type='number'
                        placeholder='pincode'
                        value={inputValues.pincode}
                        onChange={inputHandler}
                    />
                </div>
                <div className='notification' >
                    <p 
                    style={{ 
                        color:  validPincode? "green" : 'red'
                    }}>
                        Valid Pincode
                    </p>
                </div>
                { alert.show ? <Alert { ...alert } /> : false }
                <div className='btn-container'>
                    <button
                        disabled={!validPincode}
                        onClick={checkPincode}
                        className='btn'
                    >Check</button>
                </div>
            </form>
            {offices !== null ? <PostOffice {...offices[0]} /> : false }
        </div>
  )
}

export default PincodeFinder