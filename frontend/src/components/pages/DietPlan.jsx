import React, { useEffect, useState } from 'react';
import Dashboardnavbar from './Dashboardnavbar';
import userProfileService from '../api/services/userprofile';

const DietPlan = () => {
  const [selectedDiet, setSelectedDiet] = useState('');
  const [dietPlan, setDietPlan] = useState(null);
  const [selectedMeals, setSelectedMeals] = useState({
    breakfast: '',
    lunch: '',
    dinner: ''
  });

  const handleDietChange = (e) => {
    setSelectedDiet(e.target.value);
  };

  useEffect(() => {
    getPlan();
  }, [dietPlan]);

  async function getPlan() {
    try {
      const data = await userProfileService.getUserProfiledata();
      console.log(data);
      if (data && data.dietplan) {
        setDietPlan(data.dietplan);
      }
    } catch (error) {
      console.error('Error fetching diet plan:', error);
    }
  }

  const handleMealChange = (category, mealName) => {
    setSelectedMeals(prevState => ({
      ...prevState,
      [category]: mealName
    }));
  };

  return (
    <div>
      <Dashboardnavbar />
      <div className="diet-plan-container">
        <h2>Select Your Diet Plan</h2>
        <select value={selectedDiet} onChange={handleDietChange}>
          <option value="">Select Diet Plan</option>
          <option value="veg">Vegetarian</option>
          <option value="Indian veg">Indian veg</option>
          <option value="Indian nonveg">Indian non-veg</option>
          <option value="non-veg">Non-Vegetarian</option>
          <option value="pescetarian">Pescetarian</option>
          <option value="vegan">Vegan</option>
        </select>
      </div>
      <button>Generate</button>

      {dietPlan && (
        <div className="diet-plan-list">
          {Object.keys(dietPlan).map((mealCategory) => (
            mealCategory !== 'additionalTips' ? (
              <div key={mealCategory}>
                <h3>{mealCategory}</h3>
                <select value={selectedMeals[mealCategory]} onChange={(e) => handleMealChange(mealCategory, e.target.value)}>
                  <option value="">Select {mealCategory} Meal</option>
                  {dietPlan[mealCategory].map((meal) => (
                    <option key={meal._id}>{meal.name}</option>
                  ))}
                </select>
                {selectedMeals[mealCategory] && (
                  <div>
                    <p>Description: {dietPlan[mealCategory].find(meal => meal.name === selectedMeals[mealCategory]).description}</p>
                    <h4>Calories: {dietPlan[mealCategory].find(meal => meal.name === selectedMeals[mealCategory]).calories}</h4>
                  </div>
                )}
              </div>
            ) : (
              <div key={mealCategory}>
                <h3>Additional Tips</h3>
                <ul>
                  {dietPlan.additionalTips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </div>
            )
          ))}
        </div>
      )}
    </div>
  );
};

export default DietPlan;
