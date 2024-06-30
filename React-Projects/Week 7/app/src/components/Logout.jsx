import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const nav = useNavigate(); // for navigation
    useEffect(() => {
        axios.delete("http://localhost:9876/logout", { withCredentials:true })
        .then(() => {
          localStorage.clear();
          nav("/login");
        })
        .catch((err) => {
          console.log(err);
        })
    },[nav]);
  return (
    <div>Logout</div>
  )
}

export default Logout