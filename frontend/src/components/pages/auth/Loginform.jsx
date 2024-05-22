import React, { useState } from 'react'
import {useNavigate,Link} from 'react-router-dom'
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { Input, Typography } from '@mui/joy';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Box from '@mui/joy/Box';
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
                userState: { email: email }
                  
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

               <form onSubmit={loginHandler}>
                 
               <Stack spacing={1}>
                   <Input sx={{width:"400px",minHeight:"50px"}} required  onChange={(e)=>setEmail(e.target.value)} type='email' placeholder='email address'/>
                  
                   <Input sx={{width:"400px",minHeight:"50px"}} required onChange={(e)=>setPassword(e.target.value)} type='password' placeholder='password'/>
                   <Typography level="title-sm" >
               <Link to="#">forgot password?</Link>
</Typography>
                 
                   <Button type="submit" sx={{width:"400px",minHeight:"50px"}}>Submit</Button >
               </Stack>
                   
               </form>
               <Typography level="title-sm" >
              new user? 
                <Link to="/signup"> sign up now!</Link>  
               </Typography>

            

               </Box>
  )
}

export default Loginform