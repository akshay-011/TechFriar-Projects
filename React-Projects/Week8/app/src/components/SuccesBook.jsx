import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const SuccesBook = ({ setAlert }) => {
    // for reading parameters
    const { id } = useParams();

    //for navigation
    const nav = useNavigate();

    // useEffect to book the vehicle
    useEffect(() => {
        axios.put("http://localhost:9876/vehicle/book/"+id,{}, { withCredentials:true })
        .then(() => {
            setAlert({
                show:true,
                text:"Succesfully Booked",
                color:"green"
            });
        })
        .catch((err) => {
            console.log(err);
            setAlert({
                show:true,
                text:"Some issue occured",
                color:"red"
            });
        })

        nav("/");

    }, [])
  return (
    <div>SuccesBook</div>
  )
}

export default SuccesBook