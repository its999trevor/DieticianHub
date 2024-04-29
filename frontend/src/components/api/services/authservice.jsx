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
  },
  async getToken() {
    console.log('Document cookie:', document.cookie);
    const cookies = document.cookie.split(';');
    console.log('Split cookies:', cookies);
    for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        console.log('Cookie:', name, value);
        if (name === 'token') {
            return value;
        }
    }
    return null;
}

  

};

export default authService;
