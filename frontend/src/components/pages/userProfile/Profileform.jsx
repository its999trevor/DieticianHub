import React, { useState } from 'react'
import {useNavigate,useLocation ,Link} from 'react-router-dom'

const Profileform = () => {
  const [gender, setGender] = useState('');  
  const navigate = useNavigate();
  const location = useLocation();

  
  return (
    <div>
      <h2>What is your gender?</h2>
      <select value={gender} onChange={(e) => setGender(e.target.value)}>
      <option value="">Select Gender</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
      </select>
      <button onClick={()=>{
            navigate('/weight', { state: {  ...location.state,gender } });
      }} disabled={!gender}>Next</button>


    </div>
  )
}




export default Profileform
