import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PincodeFinder from './components/PincodeFinder'
import EmailOTP from './components/EmailOTP'
import PhoneOTP from './components/PhoneOTP'
import NavBar from './components/NavBar';

export default function App() {
  return (
    <div id='main-body' >
    <NavBar />
        <Routes>
          <Route 
            path='/'
            element={<PincodeFinder />}
          />
          <Route 
            path='/email'
            element={ <EmailOTP /> }
          />
          <Route 
            path='/phone'
            element={ <PhoneOTP /> }
          />
        </Routes>
    </div>
  )
}
