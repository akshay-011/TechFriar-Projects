import React from 'react'
import style from "./navbar.module.css";

const NavBar = () => {
  return (
    <nav className={style.navbar} >
        <p className={style.navItem}>Weather</p>
    </nav>
  )
}

export default NavBar
