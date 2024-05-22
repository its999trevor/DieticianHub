import React from 'react'
import Navbar from './NavbarComponent '
import { Link, useNavigate } from 'react-router-dom'
import Box from '@mui/joy/Box';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Button from '@mui/joy/Button';
import calimg from "../../assets/file.png"
import Typography from '@mui/joy/Typography';
import Footer from './Footer';



const Homepage = () => {
  const navigate=useNavigate();
  return (
    <div className='bgcolor'>
      <Navbar/>
      <Box
        sx={{
          paddingBlockStart:"160px",
          paddingInlineStart:"400px",
          '& > div': {
            scrollSnapAlign: 'start',
          },
        }}
      
      >


<Typography
  level="h1"
  variant="plain"
  textColor={"white"}
  fontSize={"60px"}
>
  Track your goals.
</Typography>
<Typography
  level="h2"
  fontSize={"50px"}
  variant="plain"
  textColor={"white"}

>
  with DieticianHub
</Typography>
<Typography   textColor={"white"}>
  Build healthy habits with the all-in-one food, exercise, and calorie tracker.
</Typography>
         
                <Button color={"neutral"} size='lg'
                sx={{
                  backgroundColor:"white",
                  color:"black",
                  ":hover":{backgroundColor:"#A0A0A0", color:"white"}
                }}
     
                variant="solid"
              onClick={()=>{
                  navigate("/signup");

            }}>Sign up</Button>  
            <Typography textColor={"white"} >
           Already a member? <Link to="/login" style={{color:"white",textDecoration:"none"}}>Sign in</Link>
            </Typography>
            <img src={calimg} style={{width:"600px", position:"relative",bottom:"400px", left:"600px"}}/>
        </Box>
    </div>
  )
}

export default Homepage