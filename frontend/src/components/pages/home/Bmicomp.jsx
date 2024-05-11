import React, { useEffect, useState } from 'react';
import { GaugeContainer, GaugeReferenceArc, GaugeValueArc, useGaugeState } from '@mui/x-charts/Gauge';
import mealService from '../../api/services/mealservice';
import "./bmi.css"

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
  }, []);

  async function fetchdata() {
    try {
      let userdata = await mealService.getData();
      // console.log(userdata)
      setBmi(userdata.userBMI);
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
    <div className=' bmi'>
    <div className='title' >Your BMI</div>
                     
    
    <GaugeContainer className='bmicontainer'
      width={200}
      height={120}
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
    
    </div>
  );
}

export default Bmicomp;
