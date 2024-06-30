import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {  Link, useNavigate } from 'react-router-dom';
import VehicleShow from './VehicleShow';
import Loading from './Loading';
import NavBar from './NavBar';
import SideBar from "./SideBar";

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

    // filters state
    const [filters, setFilters] = useState({
      sort:'',
      search:''
    });

    const filterHandler = (e) => {
      setFilters((value) => ({...value, [e.target.name]:e.target.value}));
      console.log(filters);
    }

    // for filtering and searching
    useEffect(() => {
      if(filters.sort === "A-Z"){
        const newData = vehicles.sort((a, b) => b.name.localeCompare(a.name));
        setVehicles(newData)
      }
      
      else if(filters.sort === "Z-A"){
        const newData = vehicles.sort((a, b) => a.name.localeCompare(b.name));
        setVehicles(newData)
      }

      else if(filters.sort === "low-to-high"){
        const newData = vehicles.sort((a, b) => b.price - a.price);
        setVehicles(newData);
      }
      else if(filters.sort === "low-to-high"){
        const newData = vehicles.sort((a, b) => a.price - b.price);
        setVehicles(newData);
      }

    }, [filters.sort])

    // useEffect search 
    useEffect(() => {
      if(filters.search === ''){
        fetchData();
      }
      const newVehicle = vehicles.filter((obj) => {
        const nameMatch = obj.name.toLowerCase().includes(filters.search);
        const descMatch = obj.description.toLowerCase().includes(filters.search);
        return nameMatch || descMatch
      })
      setVehicles(newVehicle)
    }, [filters.search])


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
              console.log(res.data);
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
    <SideBar filterHandler={filterHandler} inputs={filters} />
    { isLoading ? <Loading /> :false }
    <section className='main-content' >
      <NavBar />
        {
          vehicles.map((vechicle, index) => {
            return(
              <VehicleShow setAlert={ setAlert } setIsLoading={setIsLoading} {...vechicle} key={index} />
            )
          })
        }
      </section>
    </div>
  )
}

export default Home