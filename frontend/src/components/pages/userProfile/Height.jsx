import React, { useState } from 'react'
import {useNavigate,useLocation ,Link} from 'react-router-dom'
import { Box, Input, Stack, Typography } from '@mui/joy';
import Select, { selectClasses } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Button from '@mui/joy/Button';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';

const Height = () => {
    let [height,setHeight]=useState("");
    const location = useLocation();
    const navigate = useNavigate();
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
  >   
         <Stack 
     spacing={2}>
              
            <Typography
          color="primary"
          level="h1"
          variant="plain"
          fontSize={"60px"}
        >
        What's your current height??
        </Typography>
      <Input required type='number' placeholder='height in cm' onChange={(e)=>{setHeight(e.target.value)}} />
      <Button onClick={()=>{
        navigate('/weight')
      }}>previous</Button>
      <Button onClick={()=>{
        navigate('/age', { state: { ...location.state, height } });
      } } disabled={!height}>next</Button>
      </Stack>
    </Box>
  )
}

export default Height