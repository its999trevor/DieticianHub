import api from '../api';

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
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  },

  async logout() {
    try {
      const response = await api.get('/logout');
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  },
  getToken() {
    const token = document.cookie.split('; ').find(row => row.startsWith('token='));
    // console.log(token);
    return token ? token.split('=')[1] : null;
  },

};

export default authService;
