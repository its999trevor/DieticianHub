import React from 'react';
import { Box, Typography, Link, Stack } from '@mui/joy';
import { FaSquareXTwitter as Twitter} from "react-icons/fa6";
import { FaInstagramSquare as Instagram} from "react-icons/fa";
import { IoLogoYoutube as YouTube } from "react-icons/io";
import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <Box 
    //      ="primary.main"
        display={"block"}
        sx={{background:"rgb(82,105,200)",overflow:"hidden", position:"sticky"}}
      color="white"
      py={4}
      textAlign="center"

    >
          <img onClick={()=>{navigate("/home")}}
        width={250}
        style={{}}
        alt="Logo"
        src={logo}
      />
      <Typography sx={{color:"white"}} variant="body1">
      Find your healthy, and your happy.
      </Typography>
      <Typography sx={{color:'white'}} variant="body2">
      <Typography sx={{color:'white'}} variant="h6">©️2024</Typography>{' | '}
        <Link href="#" sx={{color:"white"}} >
          Terms of Service
        </Link>
        {' | '}
        <Link href="#" sx={{color:"white"}}>
          Privacy Policy
        </Link>
      </Typography>
      

      <Link  sx={{color:"white",fontSize:"26px",paddingRight:"8px"}}><Instagram/></Link>
      <Link  sx={{color:"white",fontSize:"26px",paddingRight:"8px"}}><Twitter/></Link>
      <Link  sx={{color:"white",fontSize:"26px"}}><YouTube/></Link>
    </Box>
  );
}

export default Footer;
