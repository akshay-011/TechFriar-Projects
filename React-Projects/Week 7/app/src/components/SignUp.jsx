import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import alertElement from '../module/alertElement';
import Loading from "./Loading";

const SignUp = ({ setAlert }) => {

  // password show state
  const [showPassword, setShowPassword] = useState(false);

  // for navigating
  const nav = useNavigate();

  // field isEmpty state
  const [isEmpty, setIsEmpty] = useState(false);

  // loading indication
  const [loading, setLoading] = useState(false);

    // form data storing into a variable
	const [inputs, setInputs] = useState({
		username:'',
		password:"",
    name:"",
    phoneNumber:'',
    pincode:'',
    city:"",
    country:"",
    state:"",
    email:"",
    confirmPassword:""
	});


  // array containg all the alert names
  const [names, setNames] = useState([]);


  // funtion for handling form values
	const inputHandler = (e) => {
		setInputs((values) => ({ ...values, [e.target.name]:e.target.value }));
	}

  // useEffect for adding red alert
  useEffect(() => {
    names.map((name) => {
      alertElement(name, 'red');
      return 0;
    });
  }, [names]);

  // useEffect for checking the confirm password
  useEffect(() => {
    if(inputs.password !== inputs.confirmPassword){
      alertElement('confirmPassword', 'red')
      alertElement("password","red");
    }
    else{
      alertElement('confirmPassword', 'green');
      alertElement("password","green");
    }
  }, [inputs.confirmPassword, inputs.password]);

  // useEffect for checking form data validity
  useEffect(() => {
    // checks if the inputs is empty 
    const newIsEmpty = Object.values(inputs).some((value => value.length === 0));
    setIsEmpty(newIsEmpty);

  }, [inputs])
  

  // sign up function
  const signup = (e) => {
    // setting to it's default form
		setAlert({
      show:false,
			color:'',
			text:""
		});

		setLoading(true);

		e.preventDefault(); // preventing from submitting form

    // removing all excess styles
    names.map((name) => {
      document.getElementsByName(name)[0].removeAttribute("style");
      return 0;
    })

    // api integration
    axios.post("http://localhost:9876/user/signup", { ...inputs }, { withCredentials:true })
    .then((res) => {
      setLoading(false);
      setAlert({
        show:true,
        text:"Varify OTP",
        color:"yellow"
      });
      nav("/varify");
    })
    .catch((err) => {

      // if err is duplicate entry
        if(err.response.status === 405){
          setNames(Object.keys(err.response.data.duplicates));
          setLoading(false);
          setAlert({
            show:true,
            text:"Duplicate entry",
            color:"red"
          })
        }
    })

  }

  return (
    <div className='form-container' >
        { loading ? <Loading /> :false }
        <form className='main-form' >
        
          <div className='row'>
            <div className='form-input' >
              <label>Full Name</label>
              <input 
                type='text'
                name='name'
                value={inputs.name}
                onChange={inputHandler}
              />
            </div>

            <div className='form-input' >
              <label>Username</label>
              <input 
                type='text'
                name='username'
                value={inputs.username}
                onChange={inputHandler}
              />
            </div>
          </div>

          <div className='row'>
          
            <div className='form-input' >
              <label>Email</label>
              <input 
                type='text'
                name='email'
                value={inputs.email}
                onChange={inputHandler}
              />
            </div>

            <div className='form-input' >
              <label>Phone Number</label>
              <input 
                type='text'
                name='phoneNumber'
                value={inputs.phoneNumber}
                onChange={inputHandler}
              />
            </div>

          </div>

          <div className='row'>
          
          <div className='form-input' >
            <label>Pincode</label>
            <input 
              type='text'
              name='pincode'
              value={inputs.pincode}
              onChange={inputHandler}
            />
          </div>

          <div className='form-input' >
            <label>City</label>
            <input 
              type='text'
              name='city'
              value={inputs.city}
              onChange={inputHandler}
            />
          </div>

          </div>
          <div className='row'>
          
          <div className='form-input' >
            <label>State</label>
            <input 
              type='text'
              name='state'
              value={inputs.state}
              onChange={inputHandler}
            />
          </div>

          <div className='form-input' >
            <label>Country</label>
            <input 
              type='text'
              name='country'
              value={inputs.country}
              onChange={inputHandler}
            />
          </div>
          </div>
          <div className='row'>

          <div className='form-input' >
            <label>Password</label>
            <input 
              type={showPassword ? "text" :"password"}
              name='password'
              value={inputs.password}
              onChange={inputHandler}
            />
          </div>

          <div className='form-input' >
            <label>Confirm Password</label>
            <input 
              type={showPassword ? "text" :"password"}
              name='confirmPassword'
              value={inputs.confirmPassword}
              onChange={inputHandler}
            />
          </div>
          
          </div>

          <div className='show-password-container' >

            <input 
              type='checkbox'
              onChange={() => {
                // change show password state
                setShowPassword(!showPassword);
              }}
            />
          
            <p className='show-password'> Show Password </p>
          </div>


          <div>
				<p  >
					<Link to={"/login"} className='sub-text' >I already have an account</Link>
				</p>
			</div>

          <div className='btn-container' >
				<button 
				className='btn' 
        onClick={signup}
        disabled={isEmpty}
				>
					Sign Up
				</button>
			</div>
            
        </form>
    </div>
  )
}

export default SignUp