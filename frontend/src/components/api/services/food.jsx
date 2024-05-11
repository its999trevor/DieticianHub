import api from '../api';
const foodproducts={
   async getData(name){
    try {
        
        const response = await api.get(`/food/showitem`, { params: { name } });
        console.log('Response Data:', response.data);
    
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw new Error(error);
    }
} 
}
export default foodproducts