import React from 'react'
import Navbar from './NavbarComponent '
import { Link, useNavigate } from 'react-router-dom'

const Homepage = () => {
  const navigate=useNavigate();
  return (
    <div>
      <Navbar/>
             <h1>Track your goals</h1>
         
                <button onClick={()=>{
                  navigate("/signup");

            }} variant='primary'>Sign up</button>  
          
    </div>
  )
}

export default Homepage