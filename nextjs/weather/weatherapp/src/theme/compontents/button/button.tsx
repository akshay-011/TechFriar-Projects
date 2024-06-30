import React, { MouseEventHandler } from 'react'
import style from "./button.module.css"

const Button = ({ children, onClick }:{
  children:React.ReactNode,
  onClick:MouseEventHandler<HTMLButtonElement>
}) => {
  return (
    <div>
      <button onClick={onClick} className={ style.button } >{ children }</button>
    </div>
  )
}

export default Button
