import React, { ChangeEvent, useState } from 'react'
import TextField from '@/theme/compontents/textField/textField'
import Button from '@/theme/compontents/button/button';
import style from "./form.module.css";
import axios from 'axios';

// return a form
const Form = () => {
    // setting city input field
    const [city, setCity] = useState("");
    const [data, setData] = useState();

    // change event handler function
    const inputHandler = (event:ChangeEvent<HTMLInputElement>) => {
      setCity(event.target.value);
    }

    // fetch api handler
    async function apiFetchHandler(event:any) {
        event.preventDefualt();
        console.log("aajsfakj")
    }


  return (
      <>
        <form className={ style.form }>
            <TextField name='city' value={city} placeholder={"city"} onChange={inputHandler} />
            <Button onClick={apiFetchHandler} >Check</Button>
        </form>
        <div className='result' >
            {data}
        </div>
      </>
  )
}

export default Form
