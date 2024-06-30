import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loading from './Loading';

const Login = ({ setAlert }) => {

	const nav = useNavigate();

	// password show state
	const [showPassword, setShowPassword] = useState(false);

	// form data storing into a variable
	const [inputs, setInputs] = useState({
		username:'',
		password:""
	});

	

	// check for loading
	const [isLoading, setIsLoading] = useState(false);

	// funtion for handling form values
	const inputHandler = (e) => {
		setInputs((values) => ({ ...values, [e.target.name]:e.target.value }));
	}

	// login function
	const login = (e) => {

		// setting to it's default form
		setAlert({
			show:false,
			color:'',
			text:""
		});

		setIsLoading(true);

		e.preventDefault(); // preventing from submitting form

		axios.post("http://localhost:9876/login", { ...inputs }, { withCredentials:true })
		.then((res) => {
			console.log(res.data);
			setIsLoading(false);
			localStorage.setItem("isLoggedIn", true);

			localStorage.setItem("user_id", res.data.user._id);
			
			// if admin
			if(res.data.isAdmin){
				localStorage.setItem("isAdmin", true); // add a variable to storage
				nav("/admin");
			}
			else
				nav("/");
		})
		.catch((err) => {
			setIsLoading(false);
			console.log(err);
			// if user not found
			if(err.response.status === 400){
				setAlert({
					show:true,
					color:'red',
					text:"User Not Found"
				});
			}

			if(err.response.status === 402){
				setAlert({
					show:true,
					color:'red',
					text:"Invalid Password"
				});
				document.getElementsByName("password")[0].style.border = "3px solid red";
			}
			
		})
	}

  return (
    <div className='form-container' >
	{ isLoading ? <Loading /> :false }
		<form className='main-form' >
			<div className='form-input'>
				<label>Username</label>
				<input 
					type='text'
					name='username'
					value={inputs.username}
					onChange={inputHandler}										
				/>
			</div>

			<div className='form-input'>
				<label>Password</label>
				<input 
					type={showPassword ? "text" :"password"}
					name='password'
					value={inputs.password}
					onChange={inputHandler}										
				/>
			</div>

			<div>
				<p  >
					<Link to={"/signup"} className='sub-text' >I dont't have an account</Link>
				</p>
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

			<div className='btn-container' >
				<button 
				className='btn' 
				onClick={login}
				disabled={isLoading} 
				>
					Login
				</button>
			</div>


		</form>
    </div>
  )
}

export default Login