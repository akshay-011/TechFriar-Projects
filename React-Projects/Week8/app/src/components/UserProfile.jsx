import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import NavBar from "./NavBar";

const UserProfile = ({ setAlert }) => {

    // user state
    const [user, setUser] = useState({});

    // history state
    const [history, setHistory] = useState([]);

    // navigation
    const nav = useNavigate();

    // getting user function
    const fetchUser = async (req, res) => {
        const id = localStorage.getItem("user_id");

        axios.get("http://localhost:9876/user/get/"+id, { withCredentials: true })
        .then((res) => {
            setUser(res.data);
            setHistory(res.data.history || []);
        })
        .catch((err) => {
            setAlert({
                show:true,
                text:"Some issue with your request",
                color:"red"
            })
            console.log(err);
            nav('/');
        })
    }
    
    // user fetch useEffect
    useEffect(() => {
        fetchUser();
    },[]);

    // cancel booking function
    const cancel = async (id) => {
        axios.put("http://localhost:9876/vehicle/cancel", {
            id:id,
        }, {
            withCredentials:true
        })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        })
        fetchUser();
    }

  return (
    <div className='profile-user'>
    <NavBar />
    <section className='user'>
        <h1>{ user.name }</h1>
        <h3>{ user.username }</h3>
        <h3>{ user.email }</h3>
        <h3>{ user.phoneNumber }</h3>
    </section>
    <section className='table-container'>
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <td>Date</td>
                <td>Time</td>
                <th>Options</th>
            </tr>
        </thead>
        <tbody>
            {
                history.map((hist, index) => {
                    
                    if(!(index%2 === 0)){
                        return null;
                    }
                    const date = new Date(hist.booked_date);
                    return (
                        
                        <tr key={index} >
                        <td>{ console.log(hist.b) }</td>

                            <td>{ hist.name }</td>
                            <td>{ hist.description }</td>
                            <td>${ hist.price }</td>
                            <td>{ `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`} </td>
                            <td>{ `${date.getHours()}:${date.getMinutes()}`} </td>
                            <td>
                                {
                                hist.isBooked && hist.isCanceled ?
                                <button
                                    className='btn yellow'
                                >
                                    Pending
                                </button>
                                :
                                <button
                                className='btn red'
                                onClick={() => {
                                    cancel(hist.vehicle_id);
                                }}
                            >
                                Cancel
                            </button>
                            }
                            </td>
                        </tr>
                    )
                })
            }
        </tbody>
    </table>

    </section>

    </div>
  )
}

export default UserProfile