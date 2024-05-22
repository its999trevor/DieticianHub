import api from '../api';
import React, { useState } from 'react';


const authService = {
  async login(email, password) {
    try {
      const response = await api.post('/login', { email, password });
      return response;
    } catch (error) {
        // console.log(error.response)
      throw new Error(error);
    }
  },

  async signup(name, email, password) {
    try {
      const response = await api.post('/signup', { name, email, password });
      // console.log(response);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },

  async logout() {
    try {
      const response = await api.get('/logout');
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  }
  
  
  
  
};
export default authService;
