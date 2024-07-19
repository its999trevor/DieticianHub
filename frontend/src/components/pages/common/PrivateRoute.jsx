// PrivateRoute.jsx
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import authService from '../../api/services/authservice';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = authService.getToken();
  console.log(isAuthenticated)

  return (
    <Route
      {...rest}
      element={
        isAuthenticated ? (
          <Component />
        ) : (
          <Navigate to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
