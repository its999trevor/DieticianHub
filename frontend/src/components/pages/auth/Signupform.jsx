import React, { useState } from 'react';
import authService from '../../api/services/authservice';
import { Input, Typography, Checkbox } from '@mui/joy';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Box from '@mui/joy/Box';
import { useNavigate } from 'react-router-dom';

const Signupform = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accepted, setAccepted] = useState(false);
  const navigate = useNavigate();

  async function handleSignup(e) {
    e.preventDefault();
    if (!accepted) {
      console.log("You must accept the terms and conditions.");
      return;
    }

    try {
      const data = await authService.signup(name, email, password);
      if (data.status === 200) {
        let userId = data.data.userId;
        console.log("signed up");
        navigate('/gender', { state: { userId } });
      }
    } catch (error) {
      console.log("signup failed: ", error);
    }
  }

  return (
    <Box
      height={400}
      width={400}
      my={10}
      mx={90}
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={4}
      p={2}
      sx={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;" }}
    > 
      <form onSubmit={handleSignup}>
        <Typography
          fontSize={'42px'}
          variant="plain"
          color="neutral"
          level="h1"
        >
          SIGNUP
        </Typography>
        <Stack spacing={2}>
          <Input 
            sx={{ width: "100%", minHeight: "50px" }} 
            required 
            onChange={(e) => setName(e.target.value)} 
            placeholder='Name'
          />
          <Input 
            sx={{ width: "100%", minHeight: "50px" }} 
            required 
            onChange={(e) => setEmail(e.target.value)} 
            type='email' 
            placeholder='Email Address'
          />
          <Input 
            sx={{ width: "100%", minHeight: "50px" }} 
            required 
            onChange={(e) => setPassword(e.target.value)} 
            minLength={6} 
            type='password' 
            placeholder='Password'
          />
          <Checkbox
            label="I accept the terms and conditions"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
          />
          <Button 
            type="submit" 
            sx={{ width: "100%", minHeight: "50px" }}
          >
            Create Account
          </Button>
        </Stack>
      </form>
    </Box>
  );
}

export default Signupform;
