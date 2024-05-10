import React from 'react'
import authService from '../../api/services/authservice'
import { useState } from 'react';
import {useNavigate,Link} from 'react-router-dom'
const Signupform = () => {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const navigate = useNavigate();

  async function handleSignup(e){
    e.preventDefault();
try{
      const data=await authService.signup(name,email,password);
      
      if (data.status==200) {
        let userId=data.data.userId;
        navigate('/gender',{ state: {userId} });
      } 
}
catch(error){
      console.log("signup failed: ",error);
}
  }
  return (
    <div> 
  
        <form onSubmit={handleSignup} >
      
               
            <input required onChange={(e)=>setName(e.target.value)} placeholder='name'/>
         
            <input required onChange={(e)=>setEmail(e.target.value)} type='email' placeholder='email address'/>
         
            <input required onChange={(e)=>setPassword(e.target.value)} minLength={6} type='password' placeholder='password'/>
          
             

            <button variant='primary'>create account</button>
        </form>
</div>
  )
}

export default Signupform