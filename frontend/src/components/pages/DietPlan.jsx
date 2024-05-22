import React, { useEffect, useState } from 'react';
import Dashboardnavbar from './Dashboardnavbar';
import userProfileService from '../api/services/userprofile';
import GenerateDiet from './GenerateDiet';

const DietPlan = () => {
  const [dietPlan, setDietPlan] = useState();
  const [selectedMeals, setSelectedMeals] = useState({
    breakfast: '',
    lunch: '',
    dinner: ''
  });

  useEffect(() => {
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
    getPlan();
  }, [dietPlan]);

  const handleMealChange = (category, mealName) => {
    setSelectedMeals(prevState => ({
      ...prevState,
      [category]: mealName
    }));
  };

  return (
    <div>
      <Dashboardnavbar />
      <GenerateDiet />

      {dietPlan && (
        <div className="diet-plan-list">
          {Object.keys(dietPlan).map((mealCategory) => (
            mealCategory !== 'additionalTips' ? (
              <div key={mealCategory}>
                <h3>{mealCategory}</h3>
                <select value={selectedMeals[mealCategory]} onChange={(e) => handleMealChange(mealCategory, e.target.value)}>
                  <option value="">Select {mealCategory} Meal</option>
                  {dietPlan[mealCategory].map((meal) => (
                    <option key={meal._id} value={meal.name}>{meal.name}</option>
                  ))}
                </select>
                {selectedMeals[mealCategory] && (
                  <div>
                    {(() => {
                      const meal = dietPlan[mealCategory].find(meal => meal.name === selectedMeals[mealCategory]);
                      return meal ? (
                        <>
                          <p>Description: {meal.description}</p>
                          <h4>Calories: {meal.calories}</h4>
                        </>
                      ) : (
                        <p>Meal not found</p>
                      );
                    })()}
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
