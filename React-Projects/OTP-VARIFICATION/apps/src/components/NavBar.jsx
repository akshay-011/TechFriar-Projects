import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div id='navbar'>
        <section id='nav-container' >
            <Link to={'/'} className='nav-item'>Home</Link>
            <Link to={'/email'} className='nav-item'>Email OTP</Link>
            <Link to={'/phone'} className='nav-item'>Phone OTP</Link>
        </section>
    </div>
  )
}

export default NavBar