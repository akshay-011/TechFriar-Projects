import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const ShowChange = ({alert, setAlert}) => {
    const {username} = useParams();

    const nav = useNavigate();

    const [inputValues, setInputValues] = useState({
      _id:'',
      username:'',
      password:'',
      address:'',
      phoneNumber:'',
      email:'',
      name:''
    }); 
    useEffect(() => {
        setAlert({
          show:false,
          color:'',
          text:""
      }); 
        axios.get("http://localhost:9876/user/get/"+username, {withCredentials:true})
        .then((res) => {
            console.log(res.data);
            setInputValues(res.data);
        })
        .catch((err) => {
            console.log(err);
            nav("/");
        })
    }, []);


  const inputHandler = (event) => {
      const {name, value} = event.target; // getting name, value
      setInputValues((values) => ({...values, [name]:value}));
  }

  const update = () => {
    axios.put(`http://localhost:9876/user/update/${inputValues._id}`, { ...inputValues, withCredentials:true })
    .then((res) => {
      //update
      console.log(res);
      setAlert({
        show:true,
        color:'green',
        text:"Succesfully Updated"
      })
      nav("/");
    })
    .catch((err) => {
      console.log(err);
    })
  }
  const deleteUser = () => {
    setAlert({
      show:false,
      text:'',
      color:''
    })
    axios.delete(`http://localhost:9876/user/delete/${inputValues._id}`, {withCredentials:true})
    .then(() => {
      setAlert({
        show:true,
        text:'User Deleted',
        color:'red'
      })
      nav("/")
    })
    .catch((err) => {
      console.log(err);
    })
  }
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
          
        <div className="button-container" >
            <button 
              style={{ color:'lightgreen' }}
                className='btn'
                onClick={() => update()}
                disabled={ ( inputValues.username.length <= 0 || inputValues.password.length <= 0 ) }
            >Update</button>
            <button 
                style={{ color:'red' }}
                className='btn'
                onClick={() => deleteUser()}
                disabled={ ( inputValues.username.length <= 0 || inputValues.password.length <= 0 ) }
            >Delete</button>
        </div>
        
    </div>
  )
}

export default ShowChange