import axios from 'axios';
import React, { useState } from 'react'
import Alert from './Alert';


const Login = ({ user, setUser, navigation, alert, setAlert }) => {
    const [inputValues, setInputValues] = useState({
        username:'',
        password:''
    }) ; 

    const [showPassword, setShowPassword] = useState(false);
    

    const inputHandler = (event) => {
        const {name, value} = event.target; // getting name, value
        setInputValues((values) => ({...values, [name]:value}));
    }

    const submit = () => {
        setAlert({
            show:false,
            color:'',
            text:""
        });
        
        axios.post("http://localhost:9876/admin/login", inputValues, { withCredentials:true })
        .then((res) => {
            if(res.status === 200){
                setUser(res.data.username);
                console.log(res.data);
                setAlert({
                    show:true,
                    color:'green',
                    text:"Login Succesfull"
                });
                navigation("/");
            }
        })
        .catch((err) => {
            console.log("Error = ", err);
            if (err.response.status === 401){
                setAlert({
                    show:true,
                    color:'red',
                    text:"Incorrect Password"
                })
            }
            else{
                setAlert({
                    show:true,
                    color:'red',
                    text:"Username Not Found"
                })
            }
        })
    }

  return (
    <main>
        { alert.show ? <Alert {...alert} /> : false }
        <div id='form-container' >
            <div className="form-input" >
                <label>Username</label>
                <input 
                    placeholder='username'
                    type='text' 
                    name='username' 
                    id='username' 
                    onChange={inputHandler}
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
                    disabled={ ( inputValues.username.length <= 0 || inputValues.password.length <= 0 ) }
                >Submit</button>
            </div>
            
        </div>
    </main>
  )
}

export default Login