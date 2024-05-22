import React, { useState, useEffect } from 'react';
import userProfileService from '../../api/services/userprofile';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import Dashboardnavbar from '../Dashboardnavbar';

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
    <div>
        <Dashboardnavbar/>
      <h2>User Profile</h2>
      <div>
        <p>Email: {auth.email}</p>
        <p>
          Gender: {editMode ? (
            <input type="text" name="gender" value={userData.gender} onChange={handleInputChange} />
          ) : (
            userData.gender
          )}
        </p>
        <p>
          Weight: {editMode ? (
            <input type="text" name="weight" value={userData.weight} onChange={handleInputChange} />
          ) : (
            userData.weight
          )}
        </p>
        <p>
          Height: {editMode ? (
            <input type="text" name="height" value={userData.height} onChange={handleInputChange} />
          ) : (
            userData.height
          )}
        </p>
        <p>
          Age: {editMode ? (
            <input type="text" name="age" value={userData.age} onChange={handleInputChange} />
          ) : (
            userData.age
          )}
        </p>
        <p>
          Activity: {editMode ? (
            <input type="text" name="activity" value={userData.activity} onChange={handleInputChange} />
          ) : (
            userData.activity
          )}
        </p>
      </div>
      {editMode ? (
        <div>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      ) : (
        <button onClick={handleEdit}>Edit</button>
      )}
      <button>Delete</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UserProfile;
