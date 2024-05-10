import React, { useEffect, useState } from 'react'
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import "./macros.css"
import mealService from '../../api/services/mealservice';

import { BarChart } from '@mui/x-charts/BarChart';

const Macros = () => {
  const [data,setData] = useState([
      { value: null, label: 'Protien' },
      { value: null, label: 'Fats' },
      { value: null, label: 'Fiber' },
      { value:null, label: 'Carbs' },
    ]);
    const [protien,setProtien]=useState(0);
    const [fats,setFats]=useState(0);
    const [fiber,setFiber]=useState(0);
    const [carbs,setCarbs]=useState(0);
    const size = {
      width: 400,
      height: 250,
    };
    useEffect(()=>{
     
       fetchdata();   
          
        
      
    },[])
    async function fetchdata(){
      let userdata=await mealService.getData();
         // console.log(typeof(data.userBMR));

         setData([
          { value: userdata.TotalProtein, label: 'Protien' },
          { value: userdata.TotalFats, label: 'Fats' },
          { value:  userdata.TotalFiber, label: 'Fiber' },
          { value:userdata.TotalCarbs, label: 'Carbs' },
        ])
        setProtien(userdata.TotalProtein)
        setFats(userdata.TotalFats)
          setFiber( userdata.TotalFiber)
          setCarbs(userdata.TotalCarbs)
      
        
         
          
      
   }
    
  return (
    <div>
        
        <div className="container macros">
<div className='title' >MACROS</div>
                   <div className='content mac'>
                   <PieChart
      series={[
        {
          arcLabel: (item) => `${item.label} (${item.value}gm)`,
          arcLabelMinAngle: 45,
          data,
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'white',
          fontWeight: 'bold',
          fontSize:'12px',
        
        },
      }}
      {...size}
    />

                   </div>
        </div>

        <div className='container macronut'>
        <div className='title' >MACROS TARGET</div>
        <div className=' bar'>

        <BarChart
      series={[{ data: [protien, fats, fiber, carbs] }]}
      xAxis={[{ scaleType: 'band', data: ['Protien', 'Fats', 'Fiber', 'Carbs'] }]}
      height={300}
      width={350}
      leftAxis={null}
      />
      </div>
        </div>
    </div>
  )
}

export default Macros