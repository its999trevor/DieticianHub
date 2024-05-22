import React, { useEffect, useState } from 'react';
import Dashboardnavbar from './Dashboardnavbar';
import GenerateDiet from './GenerateDiet';
import userProfileService from '../api/services/userprofile';
import { Box, Select, selectClasses, Option, Typography, IconButton } from '@mui/joy';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Footer from './Footer';

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

    const handleLockMeal = (category) => {
        setSelectedMeals(prevState => ({
            ...prevState,
            [category]: ''
        }));
    };

    return (
        <>
            <Dashboardnavbar />
            <Box mx={4} my={5}>

            <GenerateDiet />
            {dietPlan && (
                <div className="diet-plan-list">
                    {Object.keys(dietPlan).map((mealCategory) => (
                        mealCategory !== 'additionalTips' ? (
                            <Box key={mealCategory} mb={2}>
                                <Typography variant="h3">{mealCategory}</Typography>
                                {selectedMeals[mealCategory] ? (
                                    <Box display="flex" alignItems="center">
                                        <Typography variant="subtitle1">{selectedMeals[mealCategory]}</Typography>
                                        <IconButton onClick={() => handleLockMeal(mealCategory)} size="small">
                                            <CheckCircleIcon />
                                        </IconButton>
                                    </Box>
                                ) : (
                                    <Select
                                        value={selectedMeals[mealCategory]}
                                        onChange={(e,value) => handleMealChange(mealCategory,value)}
                                        placeholder={`Select ${mealCategory} Meal`}
                                        IconComponent={KeyboardArrowDown}
                                        sx={{ width: 240 }}
                                    >
                                        {dietPlan[mealCategory].map((meal) => (
                                            <Option key={meal._id} value={meal.name}>{meal.name}</Option>
                                        ))}
                                    </Select>
                                )}
                                {selectedMeals[mealCategory] && (
                                    <div>
                                        {(() => {
                                            const meal = dietPlan[mealCategory].find(meal => meal.name === selectedMeals[mealCategory]);
                                            return meal ? (
                                                <>
                                                    {/* <Typography level='title-lg'>Name: {meal.name}</Typography> */}
                                                    <Typography>Description: {meal.description}</Typography>
                                                    <Typography variant="h4">Calories: {meal.calories}</Typography>
                                                </>
                                            ) : (
                                                <Typography>Meal not found</Typography>
                                            );
                                        })()}
                                    </div>
                                )}
                            </Box>
                        ) : (
                            <Box key={mealCategory} mb={2}>
                                <Typography variant="h3">Additional Tips</Typography>
                                <ul>
                                    {dietPlan.additionalTips.map((tip, index) => (
                                        <li key={index}>{tip}</li>
                                    ))}
                                </ul>
                            </Box>
                        )
                    ))}
                </div>
            )}
            </Box>
            <div style={{marginTop:"201px"}}>
            <Footer/>
            </div>
                
        </>
    );
};

export default DietPlan;
 