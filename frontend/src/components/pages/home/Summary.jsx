import React, { useEffect, useState } from 'react'
import { Gauge } from '@mui/x-charts/Gauge';
import "./summary.css"
import mealService from '../../api/services/mealservice';
import userProfileService from '../../api/services/userprofile';
const Summary = () => {
  let [cals,setCals]=useState(null);
  let [calseaten,setCalseaten]=useState(0);
  let [remaining,setRemaining]=useState(0);
    useEffect(()=>{
     
       fetchdata();   
          
        
      
    },[cals,calseaten])
    async function fetchdata(){
      let data=await mealService.getData();
      let userData=await userProfileService.getUserProfiledata();

         // console.log(typeof(data.userBMR));
          setCals(userData.bmr);
          setCalseaten(data.calorieseaten);
          setRemaining(cals-calseaten);
   }
    
  
  return (

    <>
       
        <div className='container'>
<div className='title' >Your Daily Summary</div>
                   <div className='content'>
                     <div className='cals'>{cals}</div>
                     <div className='tip '>Goal</div>
                     <div className='cals'>{remaining}</div>
                     <div className='tip scnd'>remaining</div>
                           
                     <Gauge className='pchart' width={100} height={100} value={calseaten} valueMin={0} valueMax={cals} />
                     <div className='tip '>  Consumed</div>                  
                     
                      <button className='btn'>Add food</button> 

                   </div>
        </div>


    </>
  )
}

export default Summary