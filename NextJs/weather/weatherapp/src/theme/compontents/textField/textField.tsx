import React, { ChangeEventHandler } from 'react'
import style from "./textField.module.css";

const TextField = ({ value, name, onChange, placeholder }:{
    value:string,
    name:string,
    onChange:ChangeEventHandler,
    placeholder:string
    
}) => {
  return (
    <div className='d' >
      <input 
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={style.textfield}
      />
    </div>
  )
}

export default TextField
