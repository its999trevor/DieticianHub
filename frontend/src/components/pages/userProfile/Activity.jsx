import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import userProfileService from '../../api/services/userprofile';
import { Box, Input, Stack, Typography } from '@mui/joy';
import Select, { selectClasses } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Button from '@mui/joy/Button';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';

const Activity = () => {
  const [activity, setActivity] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  async function profileHandler(e) {
    const { userId, gender, weight, height, age } = location.state;
    try {
      let data = await userProfileService.postUserProfile(userId, gender, weight, height, age, activity);
      console.log(data);
      navigate('/login')
    } catch (error) {
      alert('Error submitting profile: ' + error.message);
    }
  }
  function handleChange(e,newValue){
    console.log(newValue);
    setActivity(newValue);

  }
  return (
    <Box
      height={400}
      width={500}
      my={30}
      mx={90}
      display="box"
      alignItems="center"
      alignContent={"center"}
      gap={4}
      p={2}
      sx={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;" }}
    >

      <Stack
        spacing={2}>
        <Typography
          color="primary"
          level="h1"
          variant="plain"
          fontSize={"60px"}>Select Activity Level</Typography>
        <Select
          indicator={<KeyboardArrowDown />}
          sx={{
            width: 500,
            [`& .${selectClasses.indicator}`]: {
              transition: '0.2s',
              [`&.${selectClasses.expanded}`]: {
                transform: 'rotate(-180deg)',
              },
            },
          }}
           value={activity}
           placeholder="Select Activity Level"
           onChange={handleChange}>
          <Option value="low">Low</Option>
          <Option value="moderate">Moderate</Option>
          <Option value="high">High</Option>
        </Select>
        <Button onClick={() => {
          navigate('/age')
        }}>previous</Button>
        <Button disabled={!activity} onClick={profileHandler}>submit</Button>
      </Stack>
    </Box>
  )
}

export default Activity