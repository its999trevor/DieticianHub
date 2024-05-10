import api from '../api';
const mealService={
   async getData(){
        try{ 
          const response=await api.get(`/meal/mealdata`);
     //    console.log(response.data);
        return response.data;
   }
   catch(error){
    throw new Error(error);

   }
} 
}
export default mealService