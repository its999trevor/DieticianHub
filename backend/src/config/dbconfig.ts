import mongoose from "mongoose";



const connect = async () => {
    try {
      if (!process.env.DB_URL) {
        throw new Error("DB_URL is not defined in environment variables");
      }
  
      await mongoose.connect(process.env.DB_URL);
      console.log("Connected to database successfully");
    } catch (error) {
      console.error("Error connecting to database:", error);
      throw error; 
    }
  };
  export default connect