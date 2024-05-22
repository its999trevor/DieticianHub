import React, { useEffect, useState } from 'react'
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
// import "./macros.css"
import { Box, Button, Grid, Stack, Typography } from '@mui/joy';
import mealService from '../../api/services/mealservice';

import { BarChart } from '@mui/x-charts/BarChart';
const Bargraph = () => {
    
  const [data, setData] = useState([
    { value: null, label: 'Protien' },
    { value: null, label: 'Fats' },
    { value: null, label: 'Fiber' },
    { value: null, label: 'Carbs' },
  ]);
  const [protien, setProtien] = useState(0);
  const [fats, setFats] = useState(0);
  const [fiber, setFiber] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const size = {
    width: 400,
    height: 250,
  };
  useEffect(() => {

    fetchdata();



  }, [])
  async function fetchdata() {
    let userdata = await mealService.getData();
    //  console.log(typeof(data.userBMR));
    //  console.log(data);

    setData([
      { value: userdata.TotalProtein.toFixed(2), label: 'Protien' },
      { value: userdata.TotalFats.toFixed(2), label: 'Fats' },
      { value: userdata.TotalFiber.toFixed(2), label: 'Fiber' },
      { value: userdata.TotalCarbs.toFixed(2), label: 'Carbs' },
    ])
    setProtien(userdata.TotalProtein.toFixed(2))
    setFats(userdata.TotalFats.toFixed(2))
    setFiber(userdata.TotalFiber.toFixed(2))
    setCarbs(userdata.TotalCarbs.toFixed(2))
  }
  return (
    <Box
    height={300}
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
      sx={{ backgroundColor: " rgb(50, 115, 220)" }}>
        <Typography sx={{ color: "white" }} level="title-lg">MACROS TARGET</Typography>
      </Box>

    <Box my={-3} mx={3}>
      <BarChart
        series={[{ data: [protien, fats, fiber, carbs] }]}
        xAxis={[{ scaleType: 'band', data: ['Protien', 'Fats', 'Fiber', 'Carbs'] }]}
        height={300}
        width={350}
        leftAxis={null}
      />
    </Box>
  </Box>
  )
}

export default Bargraph