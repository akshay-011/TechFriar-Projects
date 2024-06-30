import axios from 'axios';
import React, { useEffect, useState } from 'react'
import BookedItems from './BookedItems';

const AdminUsers = ({ setAlert }) => {
    // users data state
    const [users, setUsers] = useState([]);

    // fetch data function 
    const fetchUsers = () => {
      setAlert({
        show:false,
        text:"",
        color:""
      });
        axios.get("http://localhost:9876/user/all", {withCredentials:true})
        .then((res) => {
          console.log(res.data);
          setUsers(res.data);
        })
        .catch((err) => {
          setAlert({
            show:true,
            text:"Some issue occured",
            color:"red"
          });
        })
    }

    // fetch users useEffect
    useEffect(() => {
      fetchUsers();
    }, []);

    // delete user functions
    const deleteUser = (id) => {
      setAlert({
        show:false,
        text:"",
        color:""
      })

      axios.delete("http://localhost:9876/user/delete/"+id, {withCredentials:true})
      .then((res) => {
        setAlert({
          show:true,
          text:"User Deleted",
          color:"red"
        });
        fetchUsers();
      })
      .catch((err) => {setAlert({
        show:true,
        text:"User Deleted Failed",
        color:"red"
      })})
    }

  return (
    <div className='table-container' >
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Pincode</th>
            <th>State</th> 
            <th>Options</th>
            <th>Booked Items</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map((user, index) => {
              if(user.isAdmin){
                return null;
              }
              // ACCEPT cancellation
              const accept = (v_id) => {
                axios.put("http://localhost:9876/vehicle/cancel_accept", {
                    vehicle_id:v_id,
                    userId:user._id
                },
                { withCredentials:true }
                )
                .then(() => {
                    console.log("cancel success");
                    fetchUsers();
                })
                .catch((err) => {
                    console.log(err);
                })
              }
              return(
                <tr key={index} >
                  <td>{ user.name }</td>
                  <td>{ user.username }</td>
                  <td>{ user.email }</td>
                  <td>{ user.phoneNumber }</td>
                  <td>{ user.pincode }</td>
                  <td>{ user.state }</td>
                  <td> 
                    <button 
                    className='btn red'
                    onClick={() => {
                      deleteUser(user._id);
                    }}
                    >
                      delete
                    </button> 
                  </td>
                  <td>
                    <BookedItems accept={accept} history={user.history} />
                  </td>
                </tr>
                )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default AdminUsers