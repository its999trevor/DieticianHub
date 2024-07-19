import express from "express";
import foodproduct from "../model/foodproduct";
const router = express.Router();
import multer from 'multer'
import fs from "fs";
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const API_KEY = process.env.API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY as any);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

function fileToGenerativePart(path: string, mimeType: string) {
    return {
      inlineData: {
        data: Buffer.from(fs.readFileSync(path)).toString("base64"),
        mimeType,
      },
    };
  }




const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null,  uniqueSuffix+file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

router.post('/uploadimage', upload.single('image'),async(req, res)=>{
    console.log(req.body);
    const img=req.file;
    const prompt = `identify the dish and return the data in json formet as 
                 name: { type: String, required: true, strictQuery: false },
                 calories: { type: Number, required: true },
                description:{type:String},
                fats: { type: Number, required: true },
                fibers: { type: Number, required: true },
                carbs: { type: Number, required: true },
                protein: { type: Number, required: true }
    `;
    
    if(img){
 const imagePart = fileToGenerativePart(
  img.path,
  "image/jpeg",
);

const result = await model.generateContent([prompt, imagePart]);
console.log(result.response.text());
const cleanedResponse=result.response.text().replace(/```json\n/g, '') 
.replace(/```/g, '')       
.replace(/\n/g, '')         
.replace(/\\/g, '');    
const parsedResponse = JSON.parse(cleanedResponse);

res.json(parsedResponse);
}
  })

router.post("/add",async(req,res)=>{
try{
    let {name,calories,description,fats,fibers,carbs,protein}=req.body;
     const newData = await foodproduct.find({ name});
     console.log(newData);
     if(newData.length==0){
    let newFood=new foodproduct({name,calories,description,fats,fibers,carbs,protein});
    await newFood.save();
    res.json({data:newFood,message:"new foodproduct added"});
     }
     else{
        res.send({exists:true,newData});
     }
}
catch(err){
    res.status(500).send(err);
}
    })
    router.get("/showitem",async(req,res)=>{
        try{
            const {name} = req.query;
        const regexPattern = new RegExp(`^${name}`, 'i');
        
        const newData = await foodproduct.find({ name: regexPattern });
        res.json(newData);
    }
    catch(err){
        console.log(err);
        res.status(500).send(err);

    }

})
router.post("/addmany",async(req,res)=>{
    try{
        let foodProductsData = req.body;
        let insertedFoodProducts = await foodproduct.insertMany(foodProductsData);
      
        res.send("added products");   
    }
    catch(err){
        res.status(500).send(err);
    }
    })


    router.put("/update/:foodProductId", async (req, res) => {
        try {
            const foodProductId = req.params.foodProductId;
            const { name, calories, fats, fibers, carbs, protein } = req.body;
    
            const updatedFoodProduct = await foodproduct.findByIdAndUpdate(foodProductId, {
                name,
                calories,
                fats,
                fibers,
                carbs,
                protein
            }, { new: true }); 
    
            res.json(updatedFoodProduct);
        } catch (err) {
            res.status(500).send(err);
        }
    });
    
    router.delete("/delete/:foodProductId", async (req, res) => {
        try {
            const foodProductId = req.params.foodProductId;
    
            await foodproduct.findByIdAndDelete(foodProductId);
    
            res.send("Food product deleted successfully");
        } catch (err) {
            res.status(500).send(err);
        }
    });
    
export default router;