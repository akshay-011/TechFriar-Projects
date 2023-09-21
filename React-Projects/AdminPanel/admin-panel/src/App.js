import React, { useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home';
import ShowChange from './components/ShowChange';
import Logout from "./components/Logout";
import NavBar from './components/NavBar';
import Alert from './components/Alert';
import AddUser from './components/AddUser';

const App = () => {
  const navigation = useNavigate();
  const [user, setUser] = useState();
    const [alert, setAlert ] = useState({
      show:false,
      color:'',
      text:""
  });
  return (
  <main>
    { user ? <NavBar /> : false }
    { alert.show ? <Alert { ...alert } /> :false }
      <Routes>
          <Route 
            path='/login' 
            element={<Login 
            navigation={navigation} 
            user={user} 
            setUser={setUser} 
            alert={alert}
            setAlert={setAlert}
            />
          } /> 

          <Route 
            path='/'
            element={
              <Home 
                user={user}
                alert={alert}
                setAlert={setAlert}
              />
            }
          />
          <Route
            path='/user/:username'
            element={
              <ShowChange 
                users= {user}  
                alert={alert}
                setAlert={setAlert}
              />
            }
          />
          <Route 
            path='/logout'
            element={
              <Logout 
                setUser={ setUser }
                navigation={ navigation }
                alert={alert}
              setAlert={setAlert}
              />
            }
          />
          <Route 
            path='/add'
            element={
              <AddUser 
              alert={alert}
              setAlert={setAlert}
              />
            }
          />
      </Routes> 
    </main>
  )
}

export default App