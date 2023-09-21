import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Card from './Card';
import { useNavigate } from 'react-router-dom';

const Home = ( {user, alert, setAlert} ) => {
    const [userData, setUserData] = useState([]);
    
    const navigation = useNavigate();
    useEffect(() => {
      console.log("fetching data");
        axios.get("http://localhost:9876/user/show", {withCredentials:true})
        .then((res) => {
            setUserData(res.data);
        })
        .catch((err) => {
            console.log("Error occured ", err);
            navigation("/logout");
        })
    }, [navigation]);
  return (
    <div>
      
      {
        userData.map((user, index) => {
          return(
            <Card navigation={navigation} key={index} user={user} />
          )
        })
      }
    </div>
  )
}

export default Home