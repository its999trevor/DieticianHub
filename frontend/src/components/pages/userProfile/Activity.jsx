import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import userProfileService from '../../api/services/userprofile';

const Activity = () => {
    const [activity, setActivity] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    async function profileHandler(e) {
        const { userId,gender, weight, height, age } = location.state;
        try {
          let data=await userProfileService.postUserProfile(userId,gender, weight, height, age, activity);
          console.log(data);
          alert('Profile submitted successfully!');
        } catch (error) {
          alert('Error submitting profile: ' + error.message);
        }
    }
  return (
    <div>
         <h2>Select Activity Level</h2>
      <select value={activity} onChange={(e)=>{ setActivity(e.target.value);}}>
        <option value="">Select Activity Level</option>
        <option value="low">Low</option>
        <option value="moderate">Moderate</option>
        <option value="high">High</option>
      </select>
      <button onClick={()=>{
        navigate('/age')
      }}>previous</button>
      <button onClick={profileHandler}>submit</button>  
    </div>
  )
}

export default Activity