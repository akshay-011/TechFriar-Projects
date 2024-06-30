import axios from 'axios';
import React, { useEffect, useState } from 'react'

const PinCode = ({ setAlert, complete }) => {
    const [postOffices, setPostOffices] = useState([]);
    const [inputValues, setInputValues] = useState({
        pincode:'',
        Block:'',
        District:'',
        Division:'',
        Name:'',
        Region:'',
        State:''
    })

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setInputValues((values) => ({...values, [name]:value}));
    }

    useEffect(() => {
        if(inputValues.pincode.length === 6){
            setAlert({
                show:false,
                text:'',
                color:''
            })
            axios.get("https://api.postalpincode.in/pincode/"+inputValues.pincode)
            .then((res) => {
                setPostOffices(res.data[0].PostOffice);
                console.log("API called ");
                setInputValues({
                        pincode:inputValues.pincode,
                        Block:postOffices[0].Block,
                        District:postOffices[0].District,
                        Division:postOffices[0].Division,
                        Name:postOffices[0].Name,
                        Region:postOffices[0].Region,
                        State:postOffices[0].State
                });

            })
            .catch(() => {
                setAlert({
                    show:true,
                    text:'Are You sure this is a valid pincode',
                    color:'yellow'
                });
            })
        }
    }, [inputValues.pincode])

  return (
    <div className='form-main' >
        <form>
        <div className='row' >
            <div className='form-input'>
                <label>Pincode</label>
                <input 
                    type='text'
                    name='pincode'
                    placeholder='000000'
                    value={inputValues.pincode}
                    autoFocus={true}
                    onChange={inputHandler}
                />
            </div>

            <div className='form-input'>
                <label>Name</label>
                <select name='Name' onChange={inputHandler} >
                    {
                        postOffices.map((value, index) => {
                            return(
                                <option key={index} >{value.Name}</option>
                            )
                        })
                    }
                </select>
            </div>
            </div>

            <div className='row'>

                <div className='form-input'>
                    <label>Block</label>
                    <input 
                        type='text'
                        name='Block'
                        placeholder='Block'
                        value={inputValues.Block}
                        onChange={inputHandler}
                    />
                </div>
                <div className='form-input'>
                    <label>Region</label>
                    <input 
                        type='text'
                        name='Region'
                        placeholder='Region'
                        value={inputValues.Region}
                        onChange={inputHandler}
                    />
                </div>
            </div>

            <div className='row'>

                <div className='form-input'>
                    <label>District</label>
                    <input 
                        type='District'
                        name='District'
                        placeholder='District'
                        value={inputValues.District}
                        onChange={inputHandler}
                    />
                </div>
                <div className='form-input'>
                    <label>State</label>
                    <input 
                        type='text'
                        name='State'
                        placeholder='State'
                        value={inputValues.State}
                        onChange={inputHandler}
                    />
                </div>
            </div>
        
            <button
                onClick={(e) => {
                    e.preventDefault();
                    complete();
                }}
            >
                Next
            </button>
        </form>     
    </div>
  )
}

export default PinCode