import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Logout = ({ setUser, alert, setAlert }) => {
    const navigate = useNavigate();
    useEffect(() => {
        setAlert({
          show:false,
          color:'',
          text:""
        });
        axios.delete("http://localhost:9876/admin/logout", { withCredentials:true })
        .then((res) => {
          console.log(res);
            setUser(false);
            console.log("Succes"); 
            navigate("/login");

        })
        .catch((err) => {
          console.log("Error ", err);
        })
        navigate("/login");
    }, []);
  return (
    <div>Logout</div>
  )
}

export default Logout