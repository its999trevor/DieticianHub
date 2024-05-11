import React from 'react'
import {Routes,Route,Navigate,useNavigate } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Profileform from './pages/userProfile/Profileform'
import Weight from './pages/userProfile/Weight'
import Height from './pages/userProfile/Height'
import Age from './pages/userProfile/Age'
import Activity from './pages/userProfile/Activity'
import Profile from './pages/Profile'
import Diary from './pages/Diary'

const Allroutes = () => {

  return (
    <div>
        <Routes>
            <Route path="/" element={<Homepage/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
          <Route path="/home" element={<Dashboard />} />
          <Route path="/gender" element={<Profileform />} />
          <Route path="/weight" element={<Weight />} />
          <Route path="/height" element={<Height />} />
          <Route path="/age" element={<Age/>} />
          <Route path="/activity" element={<Activity/>} />
          <Route path="/diary" element={<Diary/>} />
          
        </Routes>
    </div>
  )
}

export default Allroutes