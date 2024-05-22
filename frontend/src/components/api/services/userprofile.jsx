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
      async getUserProfiledata() {
        try {
          const response = await api.get(`/user/userdata`);
          return response.data;
        } catch (error) {
          throw new Error(error.response.data);
        }
      },
      async updateProfile(gender,weight,height,age,activity){
        try{
          const respone= await api.put(`/user/updateuser`,{gender,weight,height,age,activity});
          return respone.data;
      } catch(error){
          throw new Error(error.response.data);
      }
      },
      async delete(){
        try{

          const response=await api.delete("/user/deleteuser");
          return response.data;
        }catch(err){
          throw new Error(err);
        }
      }

}
export default userProfileService;
