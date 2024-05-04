import React, { useState } from 'react'
import {useNavigate,useLocation ,Link} from 'react-router-dom'
const Weight = () => {
    let [weight,setWeight]=useState("");
    const navigate = useNavigate();
    const location = useLocation();

  return (
    <div>
        What's your current weight??
      <input placeholder='weight in kg' onChange={(e)=>{setWeight(e.target.value)}} />
      <button onClick={()=>{
        navigate('/gender')
      }}>previous</button>
      <button onClick={()=>{
             navigate('/height', { state: { ...location.state, weight } });

      }}>next</button>
    </div>
  )
}

export default Weight