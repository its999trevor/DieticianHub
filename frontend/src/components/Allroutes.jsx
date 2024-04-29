import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import authService from './api/services/authservice';

const Allroutes = () => {
  const isAuthenticated = authService.getToken() !== null;
  console.log(isAuthenticated);

  return (
    <div>
        <Routes>
            <Route path="/" element={<Homepage/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            {isAuthenticated ? (
          <Route path="/home" element={<Dashboard />} />
        ) : (
          // Redirect to login if the user is not authenticated
          <Route path="/home" element={<Navigate to="/login" />} />
        )}
        </Routes>
    </div>
  )
}

export default Allroutes