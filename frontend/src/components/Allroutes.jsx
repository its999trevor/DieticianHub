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
import UserProfile from './pages/userProfile/Userprofile'

const Allroutes = () => {
  
  const isAuth = useIsAuthenticated()
  return (
    <div>
        <Routes>
            
            <Route path="/login"  element={!isAuth?<Login/>:<Dashboard/>}/>
            <Route path="/signup"  element={!isAuth?<Signup/>:<Dashboard/>}/>
            <Route path="/" element={!isAuth?<Homepage/>:<Dashboard/>}/>
          <Route path="/gender" element={!isAuth?<Profileform/>:<Dashboard/>}/>
          <Route path="/weight" element={!isAuth?<Weight />:<Dashboard/>} />
          <Route path="/height" element={!isAuth?<Height />:<Dashboard/>} />
          <Route path="/age" element={!isAuth?<Age/>:<Dashboard/>} />
          <Route path="/activity" element={!isAuth?<Activity/>:<Dashboard/>} />
        
          <Route element={<AuthOutlet fallbackPath='/login' />}>
          <Route path="/home" element={<Dashboard />} />
          <Route path="/diary" element={<Diary/>} />
          <Route path="/diary/:date" element={<Diary/>} />
          <Route path="/add/:mealtype/:date" element={<Addfood/>} />
          <Route path="/dietplan" element={<DietPlan/>} />
          <Route path="/profile" element={<UserProfile/>} />
          </Route>

          
        </Routes>
    </div>
  )
}

export default Allroutes