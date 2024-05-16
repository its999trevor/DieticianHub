import React, { useState } from 'react'
import {useNavigate,Link} from 'react-router-dom'
import useSignIn from 'react-auth-kit/hooks/useSignIn';

import authService from '../../api/services/authservice'
import { useEffect } from 'react';


const Loginform = () => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate = useNavigate();
    const signIn = useSignIn();
    async function loginHandler(e) {
      e.preventDefault();
      try {
          const userData = await authService.login(email, password);
          // console.log('userData:', userData);
          if (userData && userData.data && userData.data.token) {
              if (signIn({
                auth: {
                  token: userData.data.token,
                  expiresIn: 3600,
                  type: 'Bearer',
                },
                authstate: { email: email }
                  
              })) {
                  navigate('/home');
              }
          } else {
              console.log('Login failed:', userData ? userData.error : 'Unknown error'); // Log the error message if available
          }
      } catch (error) {
          console.log('Login failed:', error); // Log any errors that occur during the login process
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