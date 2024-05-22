import React, { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts';
import logs from '../../api/services/dailylog';
import { Box, Button, Grid, Stack, Typography } from '@mui/joy';

const Callog = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchdata();
  }, []);
  // console.log(chartData);
  async function fetchdata() {
    try {
      const userData = await logs.getData();
      const logData = userData[0].logs;
      // console.log(logData)
      // Prepare data for LineChart
      const chartDataArray = logData.map(log => ({
        date: new Date(log.date),
        totalCalories: log.mealeaten ? log.mealeaten.totalCalories : 0, // Check if log.mealeaten is not null
      }));
  
      setChartData(chartDataArray);
    } catch (error) {
      console.error('Error fetching log data:', error);
    }
  }
  

  // console.log('ChartData:', chartData);

  return (
    <Box
    height={420}
    mx={1}
    my={1}
    width={500}
    boxShadow={"rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;"}
    display="block"
    gridTemplateColumns="repeat(12, 1fr)"
    gap={4}
    sx={{ backgroundColor: " rgba(50, 115, 220, 0.3);" }}
  >  
    <Box px={1}
      sx={{ backgroundColor: " rgb(50, 115, 220)" }}>
        <Typography sx={{ color: "white" }} level="title-lg">Your Progress chart</Typography>
      </Box>
      <Box my={2}></Box>
    
       <LineChart
      xAxis={[
        {
          id: 'date',
          data: chartData.map(data => data.date),
          scaleType: 'time',
        },
      ]}
      series={[
        {
          id: 'progress',
          label: 'Your progress',
          data: chartData.map(data => data.totalCalories),
          stack: 'total',
          area: true,
          showMark: false,
        }
      ]}
      width={500}
      height={400}
      margin={{ left: 70 }}
    />
    
    </Box>
  );
}

export default Callog;
