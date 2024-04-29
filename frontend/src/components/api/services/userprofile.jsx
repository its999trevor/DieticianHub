import api from '../api';
const userProfileService = {
    async postUserProfile(gender,weight,height,age,activity){
        try{
            const respone= await api.post('/user/newuser',{gender,weight,height,age,activity});
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

}
export default userProfileService;
