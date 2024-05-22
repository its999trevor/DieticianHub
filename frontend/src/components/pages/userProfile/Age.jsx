import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Input, Stack, Typography } from '@mui/joy';
import Select, { selectClasses } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Button from '@mui/joy/Button';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';

const Age = () => {
    let [age,setAge]=useState("");
    const navigate = useNavigate();
    const location = useLocation();

  return (
    <Box
    height={400}
    width={500}
    my={30}
    mx={90}
    display="box"
    alignItems="center"
    alignContent={"center"}
    gap={4}
    p={2}
    sx={{boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;" }}
  >          <Stack 
          spacing={2}>
         <Typography
       color="primary"
       level="h1"
       variant="plain"
       fontSize={"60px"}
   >
           What's your current age??
           </Typography>
      <Input required type='number' placeholder='tell us about your age?? dont be shy??' onChange={(e)=>{setAge(e.target.value)}} />
      <Button onClick={()=>{
        navigate('/height')
      }}>previous</Button>
      <Button onClick={()=>{
                            navigate('/activity', { state: { ...location.state, age } });
      }} disabled={!age}>next</Button>
      </Stack>
    </Box>
  )
}

export default Age