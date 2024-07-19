import api from '../api';
const foodproducts={
   async getData(name){
    try {
        
        const response = await api.get(`/food/showitem`, { params: { name } });
        // console.log('Response Data:', response.data);
    
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw new Error(error);
    }
}, async addCustom(name,calories,description,fats,fibers,carbs,protein){
    try{
        const response=await api.post(`/food/add`,{name,calories,description,fats,fibers,carbs,protein});
        return response.data;
    }catch(err){
        return new Error(err);
    }
},
async upload(formData){
    try{
        const response=await api.post("/food/uploadimage",formData,{
            headers:{"Content-Type":"multipart/form-data"}
        })
        return response.data;
    }catch(err){
        return new Error(err);
    }

} 
}
export default foodproducts