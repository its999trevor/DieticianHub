import React, { useState, useEffect } from 'react';
import userProfileService from '../../api/services/userprofile';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import Dashboardnavbar from '../Dashboardnavbar';
import { Box, Button, Typography, Input } from '@mui/joy';

const UserProfile = () => {
  const [userData, setUserData] = useState({});
  const auth = useAuthUser();
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await userProfileService.getUserProfiledata();
      setUserData(response);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSubmit = async () => {
    try {
      await userProfileService.updateProfile(userData.gender, userData.weight, userData.height, userData.age, userData.activity);
      setMessage('Data updated successfully');
      setEditMode(false);
    } catch (error) {
      console.error('Error updating user data:', error);
      setMessage('Failed to update data');
    }
  };

  return (
    <>
      <Dashboardnavbar />
      <Box   height={700}
      width={500}
      my={10}
      mx={90}
      display="box"
      alignItems="center"
      alignContent={"center"}
      gap={4}
      p={2}
      sx={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;" }}>
        <Typography level="h1" mb={2}>User Profile</Typography>
        <Box mb={4}>
          <Typography variant="subtitle1">Email: {auth.email}</Typography>
          <Box mt={2}>
            <Typography level="h3">Profile Data</Typography>
            <Typography variant="subtitle1">
              Gender: {editMode ? (
                <Input name="gender" value={userData.gender} onChange={handleInputChange} />
              ) : (
                userData.gender
              )}
            </Typography>
            <Typography variant="subtitle1">
              Weight: {editMode ? (
                <Input name="weight" value={userData.weight} onChange={handleInputChange} />
              ) : (
                userData.weight
              )}
            </Typography>
            <Typography variant="subtitle1">
              Height: {editMode ? (
                <Input name="height" value={userData.height} onChange={handleInputChange} />
              ) : (
                userData.height
              )}
            </Typography>
            <Typography variant="subtitle1">
              Age: {editMode ? (
                <Input name="age" value={userData.age} onChange={handleInputChange} />
              ) : (
                userData.age
              )}
            </Typography>
            <Typography variant="subtitle1">
              Activity: {editMode ? (
                <Input name="activity" value={userData.activity} onChange={handleInputChange} />
              ) : (
                userData.activity
              )}
            </Typography>
          </Box>
        </Box> 
        {editMode ? (
          <Box >
            <Button variant="solid" onClick={handleSubmit}>Submit</Button>
          </Box>
        ) : (
          <Box>
            <Button variant="outlined" onClick={handleEdit}>Edit</Button>
          </Box>
        )}
        <Button variant="outlined">Delete</Button>
        {message && <Typography>{message}</Typography>}
      </Box>
    </>
  );
};

export default UserProfile;
