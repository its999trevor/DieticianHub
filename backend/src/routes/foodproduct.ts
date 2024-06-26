import express from "express";
import foodproduct from "../model/foodproduct";
const router = express.Router();

router.post("/add",async(req,res)=>{
try{
    let {name,calories,description,fats,fibers,carbs,protein}=req.body;
    let newFood=new foodproduct({name,calories,description,fats,fibers,carbs,protein});
    await newFood.save();
    res.json({data:newFood,message:"new foodproduct added"});
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