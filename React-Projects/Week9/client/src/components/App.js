import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import React from 'react';
import Login from "./Login";
import SignUp from "./SignUp";

const App = () => {
  return (
    <div>
      <Routes>
        <Route 
          path="/"
          element={<Home />}
        />
        <Route 
          path="/login"
          element={ <Login /> }
        />
        <Route 
          path="/signup"
          element={ <SignUp /> }
        />
      </Routes>
    </div>
  );
}

export default App;
