import React, { useState } from 'react';
import diet from '../api/services/diet';
import { Box, Select, selectClasses, Option, Input, Stack, Button, Typography, CircularProgress } from '@mui/joy';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';

const GenerateDiet = () => {
    const [selectedDiet, setSelectedDiet] = useState('');
    const [loading, setLoading] = useState(false);

    const handleDietChange = (e, value) => {
        setSelectedDiet(value);
    };

    async function getdata(e) {
        e.preventDefault();
        setLoading(true);
        try {
            let response = await diet.postDiet(selectedDiet);
            console.log("ai working!!", response);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className={`blur-background ${loading ? 'active' : ''}`}>
                <Typography
                    color="primary"
                    level="h1"
                    variant="plain"
                    fontWeight={"600"}
                >
                    Select Your Diet Plan
                </Typography>
                <form onSubmit={getdata}>
                  <Stack gap={2}>

                    <Select
                        placeholder="Select Diet Plan"
                        value={selectedDiet}
                        onChange={handleDietChange}
                        indicator={<KeyboardArrowDown />}
                        sx={{
                          width: 240,
                          [`& .${selectClasses.indicator}`]: {
                            transition: '0.2s',
                            [`&.${selectClasses.expanded}`]: {
                              transform: 'rotate(-180deg)',
                            },
                          },
                        }}
                        >
                        <Option value="veg">Vegetarian</Option>
                        <Option value="Indian veg">Indian veg</Option>
                        <Option value="Indian nonveg">Indian non-veg</Option>
                        <Option value="non-veg">Non-Vegetarian</Option>
                        <Option value="pescetarian">Pescetarian</Option>
                        <Option value="vegan">Vegan</Option>
                    </Select>
                    <Button sx={{width:"240px"}} variant="solid" type="submit">Generate</Button>
                    {loading && <CircularProgress size="lg" sx={{
                      position: 'fixed',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      backdropFilter: 'blur(3px)',
                      height:"100%",
                      width:"100%"
                    }} />}
                    </Stack>
                </form>
            </div>
        </>
    );
};

export default GenerateDiet;
