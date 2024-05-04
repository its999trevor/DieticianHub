import React, { useState } from 'react'
import {useNavigate,useLocation ,Link} from 'react-router-dom'

const Height = () => {
    let [height,setHeight]=useState("");
    const location = useLocation();
    const navigate = useNavigate();
  return (
    <div>
        
        What's your current height??
      <input placeholder='height in cm' onChange={(e)=>{setHeight(e.target.value)}} />
      <button onClick={()=>{
        navigate('/weight')
      }}>previous</button>
      <button onClick={()=>{
                    navigate('/age', { state: { ...location.state, height } });
      }}>next</button>
    </div>
  )
}

export default Height