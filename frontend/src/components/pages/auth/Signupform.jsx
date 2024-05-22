import React from 'react'
import authService from '../../api/services/authservice'
import { useState } from 'react';
import { Input, Typography } from '@mui/joy';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Box from '@mui/joy/Box';
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
        console.log("signedup")
      
        navigate('/gender',{ state: {userId} });
      } 
}
catch(error){
      console.log("signup failed: ",error);
}
  }
  return (
    <Box
    height={400}
    width={400}
    my={10}
    mx={90}
    display="box"
    alignItems="center"
    alignContent={"center"}
    gap={4}
    p={2}
    sx={{boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;" }}
  > 
  
        <form onSubmit={handleSignup} >
        <Stack spacing={1}>
      
               
            <Input sx={{width:"400px",minHeight:"50px"}} required onChange={(e)=>setName(e.target.value)} placeholder='name'/>
         
            <Input sx={{width:"400px",minHeight:"50px"}} required onChange={(e)=>setEmail(e.target.value)} type='email' placeholder='email address'/>
         
            <Input sx={{width:"400px",minHeight:"50px"}} required onChange={(e)=>setPassword(e.target.value)} minLength={6} type='password' placeholder='password'/>
          
             

            <Button type="submit" sx={{width:"400px",minHeight:"50px"}}>create account</Button>
            </Stack>
        </form>


</Box>
  )
}

export default Signupform