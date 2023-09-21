import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddUser = ({alert, setAlert}) => {
    const nav = useNavigate();

    const [inputValues, setInputValues] = useState({
      username:'',
      password:'',
      address:'',
      phoneNumber:'',
      email:'',
      name:''
    }); 


  const inputHandler = (event) => {
      const {name, value} = event.target; // getting name, value
      setInputValues((values) => ({...values, [name]:value}));
  }

  const submit = () => {
    setAlert({
        show:false,
        color:'',
        text:""
    })
    console.log('came');
axios.post("http://localhost:9876/user/add/", { ...inputValues }, {withCredentials:true})
    .then((res) => {
        setAlert({
            show:true,
            color:'green',
            text:"User Added Succesfully"
        })
        console.log(res);
        nav("/");
    })
    .catch((err) => {
        console.log("Error adding user ", err);
        setAlert({
            show:true,
            color:'red',
            text:"Duplicate entry"
        })
    })
  }
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div id='form-container' >
        <div className="form-input" >
            <label>Full Name</label>
            <input 
                placeholder='name'
                type='text' 
                name='name' 
                id='name' 
                onChange={inputHandler}
                value={inputValues.name}
            />
        </div>

        <div className="form-input" >
            <label>Username</label>
            <input 
                placeholder='username'
                type='text' 
                name='username' 
                id='username' 
                onChange={inputHandler}
                value={inputValues.username}
            />
        </div>

          <div className="form-input" >
            <label>Email</label>
            <input 
                placeholder='Email'
                type='text' 
                name='email' 
                id='email' 
                onChange={inputHandler}
                value={inputValues.email}
            />
          </div>

          <div className="form-input" >
            <label>Address</label>
            <input 
                placeholder='Address'
                type='text' 
                name='address' 
                id='adress' 
                onChange={inputHandler}
                value={inputValues.address}
            />
          </div>

          <div className="form-input" >
            <label>Phone Number</label>
            <input 
                placeholder='Phone Number'
                type='text' 
                name='phoneNumber' 
                id='phoneNumber' 
                onChange={inputHandler}
                value={inputValues.phoneNumber}
            />
          </div>

          <div className='form-input'>
          <label>Password</label>
          <input
              placeholder='password'
              type={ showPassword ? "text" : "password" }
              name='password'
              id='password'
              onChange={inputHandler}
              required={true}
          />
      </div>
      <div className='show-password-container' >
      <input 
          type='checkbox'
          onClick={() => { setShowPassword(!showPassword) }}
          id='checkBox'
      />
      <label>Show password</label>
  </div>
        <div className="button-container" >
            <button 
                id="submit-btn"
                className='btn'
                onClick={() => submit()}
            >Add</button>
        </div>
        
    </div>
  )
}

export default AddUser