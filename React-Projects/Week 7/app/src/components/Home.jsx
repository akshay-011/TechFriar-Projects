import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {  Link, useNavigate } from 'react-router-dom';
import VehicleShow from './VehicleShow';
import Loading from './Loading';

const Home = ({ setAlert }) => {
  // for navigation
    const nav = useNavigate();

    // vehicle data state
    const [vehicles, setVehicles] = useState([]);
     // loading check state
     const [isLoading, setIsLoading] = useState(false);

    // useEffect for checking loged in or not
    useEffect(() => {
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        if(!isLoggedIn){
            nav("/login");
        }
    }, [nav]);

    // fetching all vehicle function
    const fetchData = async () =>{     
      setAlert({
              show:false,
              text:"",
              color:""
          });
          axios.get("http://localhost:9876/vehicle/all", { withCredentials:true })
          .then((res) => {
              setVehicles(res.data);
          })
          .catch((err) => {
              setAlert({
                  show:true,
                  text:"Some Error occured",
                  color:"yellow"
              });
              console.log(err);
          });
      }

      //fetch data useEffect
      useEffect(() => {
        fetchData();
      }, [])

  return (
    <div className='user-home' >
    { isLoading ? <Loading /> :false }
    <div className='navbar'>
      <h1 className='head1'>Vehicle List</h1>
      <span>
        <Link to={"/logout"} className='btn' >Logout</Link>
      </span>
    </div>
      {
        vehicles.map((vechicle, index) => {
          return(
            <VehicleShow setAlert={ setAlert } setIsLoading={setIsLoading} {...vechicle} key={index} />
          )
        })
      }
    </div>
  )
}

export default Home