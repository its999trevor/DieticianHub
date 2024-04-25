import express from "express";
import userProfile from "../model/userprofile";
import { verifyToken } from "../utils/auth";
import { GoogleGenerativeAI,HarmCategory,HarmBlockThreshold,} from "@google/generative-ai"

const MODEL_NAME = "gemini-1.5-pro-latest";

const API_KEY=process.env.API_KEY;


async function runChat(data:any) {
    if(API_KEY){
    const genAI = new GoogleGenerativeAI(API_KEY);
    
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    
  
    const generationConfig = {
      temperature: 1,
      topK: 0,
      topP: 0.95,
      maxOutputTokens: 8192,
    };
  
    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];
  
    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [
      ],
    });
  
    const result = await chat.sendMessage(data);
    const response = result.response;
    console.log(response.text());
    return response.text();
}
  }
  
  
  
  const router = express.Router();
  router.get("/",verifyToken,async (req,res)=>{
      let meal_type=req.body.meal_type;
      const userId = req.user._doc._id;
      let data=await userProfile.findOne({userId});
    //   console.log(data);
      try {
        let data = await userProfile.findOne({ userId });
        console.log(data);
        
        if (data) {
            let message = `give dietplan recommendation for ${meal_type} diet ${data} and return the data in json
            dietplan{
                breakfast{
                    {
                        "name",
                        "description",
                        "calories"
                    }
                },
                lunch{
                    {
                        "name",
                        "description",
                        "calories"
                    }
                },
                dinner{
                    {
                        "name",
                        "description",
                        "calories"
                    }
                }
            },
            additionalTips`;
            let newdata = await runChat(message);
            console.log(newdata);
            res.send(newdata);
        } else {
            res.status(404).send("User profile data not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    } 
})
export default router;