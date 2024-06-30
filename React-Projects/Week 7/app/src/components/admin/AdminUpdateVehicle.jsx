import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import axios from 'axios';

const AdminUpdateVehicle = ({ setAlert }) => {
    const _id = useParams().id;
    // for navigation
    const nav = useNavigate();

  // form data input state
  const [inputs, setInputs] = useState({
    name:"",
    description:'',
    price:'',
    quantity:'',
    _id:''
  });

  // useEffect for fetching vehicle data
  useEffect(() => {
    setAlert({
        show:false,
        color:"",
        text:""
    })
    axios.get("http://localhost:9876/vehicle/get/"+_id, {withCredentials:true})
    .then((res) => {
        setInputs(res.data);
        console.log(res.data);
    })
    .catch((err) => {
        setAlert({
            show:true,
            color:"red",
            text:"Failed Fetch"
        })
        console.log(err);
    })
  }, [])

  // form change input 
  const inputHandler = (e) => {
    setInputs((value) => ({...value, [e.target.name]:e.target.value}));
  }

// form submission
const submit =  async (e) => {
  setAlert({
    show:false,
    text:"",
    color:''
  })
  e.preventDefault();

  axios.post("http://localhost:9876/vehicle/update", {
    _id:inputs._id,
    name:inputs.name,
    description:inputs.description,
    price:inputs.price,
    quantity:inputs.quantity
  }, {
    withCredentials:true
  }
  )
  .then((res) => {
    setAlert({
      show:true,
      text:"Car update succes",
      color:'green'
    });
    nav("/admin");
  })
  .catch((err) => {
    console.log(err);
    setAlert({
        show:false,
        text:"Car update Error",
        color:'red'
      });
  })
}

return (
  <div className='form-container' >
    <form className='main-form' >
      <div className='form-input'>
        <label>Name</label>
        <input 
          type='text'
          name='name'
          value={inputs.name}
          onChange={inputHandler}
        />
      </div>

      <div className='form-input'>
        <label>Description</label>
        <input 
          type='text'
          name='description'
          value={inputs.description}
          onChange={inputHandler}
        />
      </div>

      <div className='form-input'>
        <label>Price</label>
        <input 
          type='number'
          name='price'
          value={inputs.price}
          onChange={inputHandler}
        />
      </div>

      <div className='form-input'>
        <label>Quantity</label>
        <input 
          type='number'
          name='quantity'
          value={inputs.quantity}
          onChange={inputHandler}
        />
      </div>

      <div className='btn-container'>
        <button 
          className='btn'
          onClick={submit} 
        >
          Update
        </button>
      </div>
      
    </form>
  </div>
)
}

export default AdminUpdateVehicle