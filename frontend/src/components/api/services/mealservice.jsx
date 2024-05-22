import api from '../api';
const mealService={
   async getData(){
        try{ 
          const response=await api.get(`/meal/mealdata`);
      //   console.log(response.data);
        return response.data;
   }
   catch(error){
    throw new Error(error);

   }
},
async postMeal(mealType,foodProducts,date){
   try{ 
      console.log(mealType);
      const response=await api.post(`/meal/${mealType}`,{foodProducts,date});
    console.log(response.data);
    return response.data;
}
catch(error){
throw new Error(error);

}

},
async getmealbyDate(date){
   try {
      //   console.log(date);
      const response = await api.get(`/meal/mealbydate`, { params: { date } });
      // console.log('Response Data:', response.data);
  
      return response.data;
  } catch (error) {
      console.error('Error fetching data:', error);
      throw new Error(error);
  }
},
async deletemeal(productId,mealType,date){
   try {
      //   console.log(date);
      const response = await api.delete(`/meal/deleteproduct`, { params: { productId, mealType, date } });
      // console.log('Response Data:', response.data);
  
      return response.data;
  } catch (error) {
      console.error('Error fetching data:', error);
      throw new Error(error);
  }
} 
}
export default mealService