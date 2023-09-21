import React from 'react'
import { useNavigate } from 'react-router-dom'

const NavBar = () => {
    const nav = useNavigate();
  return (
    <div id='navbar' >
      <div className='logos' id='add' onClick={() => nav("/add")} ></div>
        <div className='logos' id='logout' onClick={() => nav("/logout")} ></div>
    </div>
  )
}

export default NavBar