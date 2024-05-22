import React, { useEffect, useState } from 'react';
import { GaugeContainer, GaugeReferenceArc, GaugeValueArc, useGaugeState } from '@mui/x-charts/Gauge';
import mealService from '../../api/services/mealservice';
import userProfileService from '../../api/services/userprofile';
import { Box, Button, Grid, Stack, Typography } from '@mui/joy';

function GaugePointer() {
  const { valueAngle, outerRadius, cx, cy } = useGaugeState();

  if (valueAngle === null) {
    // No value to display
    return null;
  }

  const target = {
    x: cx + outerRadius * Math.sin(valueAngle),
    y: cy - outerRadius * Math.cos(valueAngle),
  };

  return (
    <g>
      <circle cx={cx} cy={cy} r={4} fill="red" />
      <path d={`M ${cx} ${cy} L ${target.x} ${target.y}`} stroke="red" strokeWidth={2} />
    </g>
  );
}

const Bmicomp = () => {
  const [bmi, setBmi] = useState(null);

  useEffect(() => {
    fetchdata();
  }, [bmi]);

  async function fetchdata() {
    try {
      let userdata = await userProfileService.getUserProfiledata();
      // console.log(userdata)
      setBmi(userdata.bmi);
    } catch (error) {
      console.error('Error fetching BMI data:', error);
    }
  }

  const getColor = () => {
    
    if (bmi < 18.5) {
      return 'orange'; // Underweight
    } else if (bmi >= 18.5 && bmi < 25) {
      return '#14993e'; // Normal weight
    } else if (bmi >= 25 && bmi < 30) {
      return 'yellow'; // Overweight
    } else {
      return 'red'; // Obese
    }
  };

  const getWeightStatus = (bmi) => {
    if (bmi < 18.5) {
      return 'Underweight';
    } else if (bmi >= 18.5 && bmi < 25) {
      return 'Normal weight';
    } else if (bmi >= 25 && bmi < 30) {
      return 'Overweight';
    } else {
      return 'Obese';
    }
  };

  return (
    <Box
    height={200}
    boxShadow={"rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;"}
    my={1}
    width={400}
    display="block"
    gridTemplateColumns="repeat(12, 1fr)"
    gap={4}
    sx={{ backgroundColor: " rgba(50, 115, 220, 0.3);" }}
  >  
  <Box px={1}
      sx={{ backgroundColor: " rgb(50, 115, 220)" }}>
        <Typography sx={{ color: "white" }} level="title-lg">Your BMI</Typography>
      </Box>
                     
    <Box mx={1.2} my={1}>

    <GaugeContainer className='bmicontainer'
      width={400}
      height={168}
      startAngle={-90}
      endAngle={90}
      value={bmi || 0}
      valueMax={40}
      
      >
      <GaugeReferenceArc style={{ stroke: 'blue' }} />
      <GaugeValueArc style={{ stroke: getColor(), strokeWidth: "5px", fill: getColor() }} />
      <text
        x="50%"
        y="50%"
        fontSize="1.5rem"
        textAnchor="middle"
        dominantBaseline="central"
        >
        {bmi}
      </text>
      <text
        x="50%"
        y="70%"
        fontSize="1rem"
        textAnchor="middle"
        dominantBaseline="central"
        
        
        >
        {getWeightStatus(bmi)}
      </text>
      <GaugePointer />
    </GaugeContainer>
          </Box>
    
    </Box>
  );
}

export default Bmicomp;
