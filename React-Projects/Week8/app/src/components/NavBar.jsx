import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className='navbar'>
      <h1 className='head1'>Vehicle List</h1>
      <div className='button-navbar' >
        <span>
        <Link to={"/profile"} className='btn' >Profile</Link>
        </span>
        <span>
        <Link to={"/logout"} className='btn' >Logout</Link>
        </span>
      </div>
    </div>
  )
}

export default NavBar