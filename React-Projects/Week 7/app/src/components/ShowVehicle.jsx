import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ShowVehicle = ({ fetchData, _id, description, name, price, quantity, image }) => {
  // for navigation
  const nav = useNavigate();
  
    // function for deleting vehicle
    const deleteVehicle = ( id ) => {
      console.log(`deleted id = ${id}`);
      axios.delete("http://localhost:9876/vehicle/delete/"+id, {withCredentials:true})
      .then(() => {
        fetchData();      
      })
      .catch((err) => {
        console.log(err);
        console.log(" error deleting vehicle");
      })
    } 

  return (
    <div 
    className={`vehicle ${quantity <= 0 ? 'disabled' : ''}`} 
    >
        <img  
            className='vehicle-image'
            alt={'Car image of ' + {name}}
            src={`http://localhost:9876/vehicle/${image}`}
        />
        <div className='vehicle-second'>
          <section className='content'>
          <p className='vehicle-tags'>
             Name : {name}
          </p>
          
          <p className='vehicle-tags'>
           Price : ${price} /-
          </p>
          
          <p className='vehicle-tags' >
            Description : {description}
          </p>

          <p className='vehicle-tags' >
            Quantity : {quantity}
          </p>
          </section>
          <section className='buttons'>
            <button 
              className='btn red' 
              onClick={() => {
                deleteVehicle(_id);
              }}
            >Delete</button>
            <button 
            className='btn green'
            onClick={() => {
              nav("vehicle/"+_id)
            }}
            >
              Update
            </button>
          </section>
        </div>
    </div>
  )
}

export default ShowVehicle