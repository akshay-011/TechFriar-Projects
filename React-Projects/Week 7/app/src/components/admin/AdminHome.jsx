import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ShowVehicle from '../ShowVehicle';;

const AdminHome = ({ setAlert }) => {
    // vehicle data state
    const [vehicle, setVehicle] = useState([]);

const fetchData = async () =>{     
    setAlert({
            show:false,
            text:"",
            color:""
        });
        axios.get("http://localhost:9876/vehicle/all", { withCredentials:true })
        .then((res) => {
            setVehicle(res.data);
        })
        .catch((err) => {
            setAlert({
                show:true,
                text:"Some Error occured",
                color:"yellow"
            });
        });
    }


    // fetch vehicle data useEffect
    useEffect( () => {
       fetchData();
    }, []);

  return (
    <div className='admin-home' >
        {
            vehicle.map((vehicle, index) => {
                return(
                    <ShowVehicle { ...vehicle } key={index} fetchData={fetchData} />
                )
            })
        }
    </div>
  )
}

export default AdminHome