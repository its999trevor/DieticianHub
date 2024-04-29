import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'

const Allroutes = () => {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Homepage/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/home" element={<Dashboard/>}/>
        </Routes>
    </div>
  )
}

export default Allroutes