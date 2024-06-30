import React from 'react';
import { Link } from 'react-router-dom';

const AdminSideBar = () => {
  return (
    <div className='sidebar' >
        <ul className='sidebar-container'>
            <li>
                <Link className='list-item' to={''}>Home</Link>
            </li>
            <li>
                <Link className='list-item' to={'vehicle/add'}>Add Vehicle</Link>
            </li>
            <li>
                <Link className='list-item' to={'user'}>Users</Link>
            </li>
            <li>
                <Link className='list-item' to={'/logout'}>Logout</Link>
            </li>
        </ul>
    </div>
  )
}

export default AdminSideBar