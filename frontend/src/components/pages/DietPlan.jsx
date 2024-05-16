import React, { useEffect, useState } from 'react';
import Dashboardnavbar from './Dashboardnavbar';
import userProfileService from '../api/services/userprofile';
import GenerateDiet from './GenerateDiet';

const DietPlan = () => {
  const [dietPlan, setDietPlan] = useState(null);
  const [selectedMeals, setSelectedMeals] = useState({
    breakfast: '',
    lunch: '',
    dinner: ''
  });

 

  useEffect(() => {
    getPlan();
  }, [dietPlan]);

  async function getPlan() {
    try {
      const data = await userProfileService.getUserProfiledata();
      // console.log(data);
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
        <GenerateDiet/>

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
