import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom';
import AdminSideBar from './AdminSideBar';
import AdminHome from './AdminHome';
import AddVehicle from './AddVehicle';
import AdminUpdateVehicle from './AdminUpdateVehicle';
import AdminUsers from './AdminUsers';

const AdminPage = ({ setAlert }) => {
    // isAdmin state
    const [isAdmin, setIsAdmin] = useState(false);

    // for navigation
    const nav = useNavigate();

    // checks whether admin or not
    useEffect(() => {
        const newisAdmin = localStorage.getItem("isAdmin");
        setIsAdmin(newisAdmin);
        
    }, [])

    if(!isAdmin){
        nav("/login");
        return ;
    }
  return (
    <div >
        <AdminSideBar />
        <section className='second-main-admin' >
            <Routes>
                <Route 
                    path='/'
                    element={ <AdminHome setAlert={setAlert} /> }
                />
                <Route 
                    path='vehicle/add'
                    element={ <AddVehicle setAlert={ setAlert } /> }
                />
                <Route 
                    path='vehicle/:id'
                    element={ <AdminUpdateVehicle setAlert={ setAlert } /> }
                />

                <Route 
                    path='user'
                    element={ <AdminUsers setAlert={setAlert} /> }
                />
            </Routes>
        </section>
    </div>
  )
}

export default AdminPage