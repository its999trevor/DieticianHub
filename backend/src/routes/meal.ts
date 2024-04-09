import express from "express";
import Meal from "../model/meal";
import FoodProduct from "../model/foodproduct";
import { verifyToken } from "../utils/auth";
import dailylog from "../model/dailylog";
import user from "../model/user";


const router = express.Router();

type MealType = {
    breakfast: {
        foodProducts: {
            productid: string;
            quantity: number;
            addedAt: Date;
        }[];
        calories: number;
    };
    lunch: {
        foodProducts: {
            productid: string;
            quantity: number;
            addedAt: Date;
        }[];
        calories: number;
    };
    dinner: {
        foodProducts: {
            productid: string;
            quantity: number;
            addedAt: Date;
        }[];
        calories: number;
    };
};

router.post("/:mealType",verifyToken, async (req, res) => {
    try {
        const { foodProducts } = req.body;
        const userId=req.user._doc._id;
        const mealType = req.params.mealType.toLowerCase() as keyof MealType;

        const currentDate = new Date().setHours(0, 0, 0, 0); 

        let meal = await Meal.findOne({ userId, createdAt: { $gte: currentDate } });
        if (!meal) {
            meal = new Meal({ userId, mealType: {} as MealType });
        }

        if (!meal.mealType[mealType]) {
            meal.mealType[mealType] = { foodProducts: [], calories: 0 };
        }
        for (const entry of foodProducts) {
            const existingFoodProduct = meal.mealType[mealType].foodProducts.find(
                (item) => item.productid == entry.productid
            );
            const foodProduct = await FoodProduct.findById(entry.productid);
            if (foodProduct) {
                const calories = foodProduct.calories * entry.quantity;
                if (existingFoodProduct) {
                    existingFoodProduct.quantity += entry.quantity;
                }
                else{
                meal.mealType[mealType].foodProducts.push({
                    productid: entry.productid,
                    quantity: entry.quantity,
                    addedAt: new Date()
                });
            }
                meal.mealType[mealType].calories += calories;
                meal.totalCalories += calories;
            }
        }
        
        
        await meal.save();
            const existingLog = await dailylog.findOne({ userId, date: currentDate });

            if (!existingLog) {
               
            
                const newLog = new dailylog({
                    userId,
                    date: currentDate,
                    mealeaten: [meal._id]
                });
                await newLog.save();
            }

        


        res.send(`Food products added to ${mealType} successfully`);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/allmeals",verifyToken,async(req,res)=>{
    const userId=req.user._doc._id;
    console.log(userId);
    const currentDate = new Date().setHours(0, 0, 0, 0); 
    let data=await Meal.findOne({ userId, createdAt: { $gte: currentDate } }).populate("mealType.breakfast.foodProducts.productid")
    .populate("mealType.lunch.foodProducts.productid")
    .populate("mealType.dinner.foodProducts.productid");
    res.json(data);
})

export default router;
