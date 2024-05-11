import api from '../api';
const userProfileService = {
    async postUserProfile(userId,gender,weight,height,age,activity){
        try{
            const respone= await api.post(`/user/newuser/${userId}`,{gender,weight,height,age,activity});
            return respone.data;
        } catch(error){
            throw new Error(error.response.data);
        }
      }
      ,
    
      async getUserProfile(userId) {
        try {
          const response = await api.get(`/user/${userId}`);
          return response.data;
        } catch (error) {
          throw new Error(error.response.data);
        }
      },
      async getUserProfiledata(userId) {
        try {
          const response = await api.get(`/user/userdata`);
          return response.data;
        } catch (error) {
          throw new Error(error.response.data);
        }
      },

}
export default userProfileService;
