import api from '../api';
const diet={
   async getData(name){
    try {
        
        const response = await api.get(`/food/showitem`, { params: { name } });
        // console.log('Response Data:', response.data);
    
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw new Error(error);
    }
},
async postDiet(meal_type){
    try{
        const response= await api.post('/diet/',{meal_type}, {
            timeout: 60000  // Timeout value in milliseconds (e.g., 10 seconds)
        });
        console.log(response.data);
        return response.data;
    }
    catch(error){
        console.error('Error posting data:', error);
        throw new Error(error);
    }
} 
}
export default diet