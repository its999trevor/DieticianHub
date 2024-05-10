import React, { useState } from 'react'
import {useNavigate,Link} from 'react-router-dom'

import authService from '../../api/services/authservice'
import { useEffect } from 'react';


const Loginform = () => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate = useNavigate();

    async function  loginHandler(e){
        e.preventDefault();
        try {
            const userData = await authService.login(email, password);
           console.log(userData); 
            // console.log(userData);
            if (userData.status==200) {
                // Navigate to home only if login was successful
                navigate('/home');
              } 
              else{
                console.log('Login failed:', userData.error);
              }
            } catch (error) {
              console.log('Login failed:', error);
            }
      
    }

  return (
    <div>
               
               <form onSubmit={loginHandler}>
                 
                   <input required  onChange={(e)=>setEmail(e.target.value)} type='email' placeholder='email address'/>
                  
                   <input required onChange={(e)=>setPassword(e.target.value)} type='password' placeholder='password'/>
                 
                   <button>Submit</button>
                   
               </form>
              new user?
                <Link to="/signup">sign up now!</Link>
               <Link to="#">forgot password?</Link>
              


    </div>
  )
}

export default Loginform