import React, { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { Box, Input, Stack, Typography } from '@mui/joy';
import Select, { selectClasses } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Button from '@mui/joy/Button';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';


const Profileform = () => {
  const [gender, setGender] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  function handleChange(e, newValue) {
    console.log(newValue);
    setGender(newValue)
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
          fontSize={"60px"}
        >What is your gender?</Typography>
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
          placeholder="select gender" onChange={handleChange}>
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
        </Select>
        <Button
          color="primary"
          variant="solid"
          onClick={() => {
            navigate('/weight', { state: { ...location.state, gender } });
          }} disabled={!gender}>Next</Button>
      </Stack>


    </Box>
  )
}




export default Profileform
