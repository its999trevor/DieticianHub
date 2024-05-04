import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';


const Age = () => {
    let [age,setAge]=useState("");
    const navigate = useNavigate();
    const location = useLocation();

  return (
    <div>
           What's your current age??
      <input placeholder='tell us about your age?? dont be shy??' onChange={(e)=>{setAge(e.target.value)}} />
      <button onClick={()=>{
        navigate('/height')
      }}>previous</button>
      <button onClick={()=>{
                            navigate('/activity', { state: { ...location.state, age } });
      }}>next</button>

    </div>
  )
}

export default Age