import React, { useState } from 'react'
import diet from '../api/services/diet'

const GenerateDiet = () => {
    const [selectedDiet, setSelectedDiet] = useState('');

    const handleDietChange = (e) => {
        setSelectedDiet(e.target.value);
      };
    async function getdata(e){
        e.preventDefault();
        // console.log(selectedDiet)
        let response=await diet.postDiet(selectedDiet);
        console.log("ai working!!",response);
    }
  return (
        <div className="diet-plan-container">
        <h2>Select Your Diet Plan</h2>
        <form onSubmit={getdata}>

        <select value={selectedDiet} onChange={handleDietChange}>
          <option disabled value="">Select Diet Plan</option>
          <option value="veg">Vegetarian</option>
          <option value="Indian veg">Indian veg</option>
          <option value="Indian nonveg">Indian non-veg</option>
          <option value="non-veg">Non-Vegetarian</option>
          <option value="pescetarian">Pescetarian</option>
          <option value="vegan">Vegan</option>
        </select>
         <button>Generate</button>
        </form>
    </div>
  )
}

export default GenerateDiet