import axios from 'axios';
import React, { useState } from 'react'

const AddVehicle = ({ setAlert }) => {
  // form data input state
    const [inputs, setInputs] = useState({
      name:"",
      description:'',
      price:'',
      quantity:'',
      image:null
    });

    // form change input 
    const inputHandler = (e) => {
      setInputs((value) => ({...value, [e.target.name]:e.target.value}));
    }

      // Handle image file selection
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setInputs((value) => ({ ...value, image: file }));
  };

  // form submission
  const submit =  async (e) => {
    setAlert({
      show:false,
      text:"",
      color:''
    })
    e.preventDefault();

    // adding data to form data
    const formData = new FormData();
    formData.append('name', inputs.name);
    formData.append('description', inputs.description);
    formData.append('price', inputs.price);
    formData.append('quantity', inputs.quantity);
    formData.append('image', inputs.image);

    axios.post("http://localhost:9876/vehicle/add", formData, {
      headers:{
        'Content-Type': 'multipart/form-data',
      },
      withCredentials:true
    }
    )
    .then((res) => {
      setAlert({
        show:true,
        text:"Car Added succes",
        color:'green'
      });
      setInputs({
        name:"",
        description:'',
        price:'',
        quantity:'',
        image:null
      })
    })
    .catch((err) => {
      console.log(err);
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

        <div className='form-input'>
          <label>File</label>
          <input 
            type='file'
            name='image'
            onChange={handleImageUpload}
          />
        </div>

        <div className='btn-container'>
          <button 
            className='btn'
            onClick={submit} 
          >
            Add
          </button>
        </div>
        
      </form>
    </div>
  )
}

export default AddVehicle