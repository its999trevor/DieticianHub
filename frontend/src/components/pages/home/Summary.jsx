import React, { useEffect, useState } from 'react'
import { Gauge } from '@mui/x-charts/Gauge';
import mealService from '../../api/services/mealservice';
import userProfileService from '../../api/services/userprofile';
import {useNavigate,Link} from 'react-router-dom'
import { Box,Button, Grid, Stack, Typography } from '@mui/joy';
const Summary = () => {
  const navigate = useNavigate();
  let [cals,setCals]=useState(0);
  let [calseaten,setCalseaten]=useState(0);
  let [remaining,setRemaining]=useState(0);
    useEffect(()=>{
     
       fetchdata();   
          
        
      
    },[cals])
    async function fetchdata(){
      let data=await mealService.getData();
      let userData=await userProfileService.getUserProfiledata();

        //  console.log(data.userBMR);
          setCals(userData.bmr);
          setCalseaten(data.calorieseaten);
          setRemaining(cals-calseaten);
   }
    
  
  return (

    <Box
    height={200}
    mx={1}
    my={1}
    boxShadow={"rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;"}
    width={460}
    display="block"
    gridTemplateColumns="repeat(12, 1fr)"
    gap={4}
    sx={{ backgroundColor:" rgba(50, 115, 220, 0.3);"  }}
  >   
       <Box px={1}
       sx={{backgroundColor:" rgb(50, 115, 220)"}}>
       <Typography sx={{color:"white"}} level="title-lg">Your Daily Summary</Typography>
       </Box>
       <Box display={"inline-flex"}  my={2} >
                  <Stack spacing={1} px={2}> 

                    <Box
                    display={"block"}
                    width={"100px"}
                    height={"100px"}
                    alignContent={"center"}
                    textAlign={"center"}
                    color={"white"}
                    fontSize={"40px"}
                    sx={{backgroundColor:"rgb(33, 68, 125)",border:"solid 2px rgb(9, 13, 63)",borderRadius:"6%"}}
                    >
                    {cals}
                    </Box>
                    <Box px={4.5}>
                     Goal
                    </Box>
                    </Stack>
                      <Stack spacing={1}>
                      <Box

                    display={'block'}
                    width={"100px"}
                    height={"100px"}
                    alignContent={"center"}
                    textAlign={"center"}
                    color={"white"}
                    fontSize={"40px"}
                    sx={{backgroundColor:"rgb(33, 68, 125)",border:"solid 2px rgb(9, 13, 63)",borderRadius:"6%"}}
                    >
                     {remaining}
                    </Box>
                     <Box px={2.7}>remaining</Box>
                      </Stack>
                      <Stack spacing={1}>


                     <Gauge className='pchart' width={100} height={100} value={calseaten} valueMin={0} valueMax={cals} />
                     <Box px={2}>  Consumed</Box>   
                     </Stack>               
                     
                      <Button sx={{height:"100px"}} onClick={()=>{navigate("/diary")}} className='btn'>Add food</Button> 
       </Box>



    </Box>
  )
}

export default Summary