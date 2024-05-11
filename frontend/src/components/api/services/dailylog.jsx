import api from '../api';
const logs={
   async getData(){
        try{ 
          const response=await api.get(`/log/`);
      //   console.log(response.data);
        return response.data;
   }
   catch(error){
    throw new Error(error);

   }
} 
}
export default logs