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
import Addfood from './pages/food/Addfood'
import DietPlan from './pages/DietPlan'
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import AuthOutlet from '@auth-kit/react-router/AuthOutlet'
import RequireAuth from '@auth-kit/react-router/RequireAuth'

const Allroutes = () => {
  
  const isAuth = useIsAuthenticated()
  return (
    <div>
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
             
            <Route path="/" element={!isAuth?<Homepage/>:<Dashboard/>}/>
          <Route path="/gender" element={<Profileform />} />
          <Route path="/weight" element={<Weight />} />
          <Route path="/height" element={<Height />} />
          <Route path="/age" element={<Age/>} />
          <Route path="/activity" element={<Activity/>} />
        
          <Route element={<AuthOutlet fallbackPath='/login' />}>
          <Route path="/home" element={<Dashboard />} />
          <Route path="/diary" element={<Diary/>} />
          <Route path="/add/:mealtype" element={<Addfood/>} />
          <Route path="/dietplan" element={<DietPlan/>} />
          </Route>

          
        </Routes>
    </div>
  )
}

export default Allroutes