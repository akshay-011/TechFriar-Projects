import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Logout from "./components/Logout";
import Vaify from "./components/Vaify";
import {  useEffect, useState } from "react";
import Alert from "./components/Alert";
import AdminPage from "./components/admin/AdminPage";
import SuccesBook from "./components/SuccesBook";

function App() {
	// this state controls the alert and it's contents color
	const [alerts, setAlert] = useState({
		show:false,
		color:'',
		text:""
	});


	// useEffect for preventing alert clash
	useEffect(() => {
		if(alerts.show){
			setTimeout(() => {
				setAlert({
					show:false,
					text:"",
					color:''
				});
			}, 3000)	
		}
	}, [alerts])

  return (
    // were all contents show
    <main id="body" >
	{ alerts.show ? <Alert { ...alerts } /> : false }
	<div id="main-body" ></div>
      <Routes>
        <Route 
			path="/"
			element={ <Home setAlert={setAlert} /> }
		/>

		<Route 
			path="/login"
			element={ <Login setAlert={setAlert} /> }
		/>

		<Route 
			path="/signup"
			element={ <SignUp alerts={alerts} setAlert={setAlert} /> }
		/>

		<Route 
			path="/logout"
			element={ <Logout  setAlert={setAlert} /> }
		/>

		<Route 
			path="/varify"
			element={ <Vaify setAlert={setAlert} /> }
		/>

		<Route 
			path="/admin/*"
			element={ <AdminPage setAlert={setAlert} /> }
		/>

		<Route 
			path="/vehicle/success/:id"
			element={ <SuccesBook setAlert={setAlert} /> }
		/>

      </Routes>
    </main>
  );
}

export default App;
