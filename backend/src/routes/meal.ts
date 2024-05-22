import express from "express";
import Meal from "../model/meal";
import FoodProduct from "../model/foodproduct";
import { verifyToken } from "../utils/auth";
import dailylog from "../model/dailylog";
import userProfile from "../model/userprofile";



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

router.post("/:mealType", verifyToken, async (req, res) => {
    try {
        const { foodProducts, date } = req.body;
        const userId = req.user._doc._id;
        const mealType = req.params.mealType.toLowerCase() as keyof MealType;

        if (!Array.isArray(foodProducts)) {
            return res.status(400).json({ error: 'Invalid foodProducts data' });
        }

        const specifiedDate = new Date(date);
        const startOfDay = new Date(specifiedDate.setHours(0, 0, 0, 0));

        let meal = await Meal.findOne({ userId, createdAt: { $gte: startOfDay, $lt: new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000) } });

        if (!meal) {
            meal = new Meal({ userId, createdAt: startOfDay, mealType: {} as MealType });
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
                } else {
                    meal.mealType[mealType].foodProducts.push({
                        productid: entry.productid,
                        quantity: entry.quantity,
                        addedAt: new Date()
                    });
                }
                meal.mealType[mealType].calories += calories;
                meal.totalCalories = (meal.totalCalories || 0) + calories;
            }
        }

        await meal.save();

        const userDailyLog = await dailylog.findOne({ userId });

        if (userDailyLog) {
            const currentLog = userDailyLog.logs.find(log => log.date.getTime() === startOfDay.getTime());

            if (!currentLog) {
                userDailyLog.logs.push({
                    date: new Date(startOfDay),
                    mealeaten: meal._id
                });
            }

            await userDailyLog.save();
        } else {
            const newDailyLog = new dailylog({
                userId,
                logs: [{
                    date: new Date(startOfDay),
                    mealeaten: meal._id
                }]
            });
            await newDailyLog.save();
        }

        res.status(200).json({ message: `Food products added to ${mealType} successfully` });

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/allmeals",verifyToken,async(req,res)=>{
    const userId=req.user._doc._id;
    // console.log(userId);
    const currentDate = new Date().setHours(0, 0, 0, 0); 
    let data=await Meal.findOne({ userId, createdAt: { $gte: currentDate } }).populate("mealType.breakfast.foodProducts.productid")
    .populate("mealType.lunch.foodProducts.productid")
    .populate("mealType.dinner.foodProducts.productid");
    res.json(data);
})






router.get("/mealdata",verifyToken,async(req,res)=>{
    try{
    const userId=req.user._doc._id;
    // console.log(userId);
    const currentDate = new Date().setHours(0, 0, 0, 0); 
    let data = await Meal.findOne({ userId, createdAt: { $gte: currentDate } })
    .populate({
        path: "mealType.breakfast.foodProducts.productid",
        model: "FoodProduct"
    })
    .populate({
        path: "mealType.lunch.foodProducts.productid",
        model: "FoodProduct"
    })
    .populate({
        path: "mealType.dinner.foodProducts.productid",
        model: "FoodProduct"
    });
    let TotalProtein = 0;
    let TotalFats = 0;
    let TotalFiber = 0;
    let TotalCarbs = 0;
    let calorieseaten = 0;
    let userBMR; 
    let userBMI;
    if (data) {
        calorieseaten = data.totalCalories || 0;
        for (const mealTypeKey of Object.keys(data.mealType) as (keyof typeof data.mealType)[]) {
            const mealType = data.mealType[mealTypeKey];
            
            mealType.foodProducts.forEach(foodProduct => {
                const product = foodProduct.productid;
                
                if (typeof product === 'object' && product !== null) {
                    TotalProtein += (product as any).protein * foodProduct.quantity;
                    TotalFats += (product as any).fats * foodProduct.quantity;
                    TotalFiber += (product as any).fibers * foodProduct.quantity;
                    TotalCarbs += (product as any).carbs * foodProduct.quantity;
                }
                
            });
        }
        
        const userProfileData = await userProfile.findOne({ userId });
        if (userProfileData) {
            userBMR = userProfileData.bmr || 0;
            userBMI = userProfileData.bmi || 0;
        }
    

        // Send the calculated totals as a response
    }
    res.json({
        TotalProtein,
        TotalFats,
        TotalFiber,
        TotalCarbs,
        calorieseaten,
        userBMR,
        userBMI
    });
} catch (error) {
    console.error("Error fetching meal data:", error);
    res.status(500).json({ error: "Internal server error" });
}
})
router.get("/mealbydate", verifyToken, async (req, res) => {
    try {
        const userId = req.user._doc._id;
        const dateParam = req.query.date as string; 
        // console.log(dateParam)

        const date = new Date(dateParam);

        const data = await Meal.find({ userId, createdAt: { $gte: date, $lt: new Date(date.getTime() + 24 * 60 * 60 * 1000) } }).populate("mealType.breakfast.foodProducts.productid")
            .populate("mealType.lunch.foodProducts.productid")
            .populate("mealType.dinner.foodProducts.productid");

        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
router.delete("/deleteproduct/", verifyToken, async (req, res) => {
    try {
        const { productId, mealType, date } = req.query;
        const userId = req.user._doc._id;
        console.log(productId, typeof (productId), "     ", mealType)
        
        const validMealTypes = ["breakfast", "lunch", "dinner"];
        if (!validMealTypes.includes(mealType as string)) {
            return res.status(400).json({ error: "Invalid meal type" });
        }

        const currdate = new Date(date as string);
        const meal = await Meal.findOne({ userId, createdAt: { $gte: date, $lt: new Date(currdate.getTime() + 24 * 60 * 60 * 1000) } });

        if (!meal) {
            return res.status(404).json({ error: "No meal found for the user" });
        }

        const mealTypeData = meal.mealType[mealType as keyof MealType];
        // console.log("mealtype", mealTypeData);

        if (!mealTypeData) {
            return res.status(404).json({ error: `No ${mealType} found in the meal` });
        }

        const index = mealTypeData.foodProducts.findIndex(foodProduct => (foodProduct.productid).toString() === productId);
        console.log("index: ", index)
        if (index === -1) {
            return res.status(404).json({ error: "Food product not found in the specified meal type" });
        }

        // Get the calories of the food product being deleted
        const deletedFoodProduct = mealTypeData.foodProducts[index];
        const deletedProduct = await FoodProduct.findById(deletedFoodProduct.productid);
        if (!deletedProduct) {
            return res.status(404).json({ error: "Food product not found" });
        }
        const deletedProductCalories = deletedProduct.calories * deletedFoodProduct.quantity;

        // Subtract the calories from the meal type and total calories
        mealTypeData.calories -= deletedProductCalories;
        meal.totalCalories -= deletedProductCalories;

        // Remove the food product from the meal type
        mealTypeData.foodProducts.splice(index, 1);

        await meal.save();

        res.json({ message: `Food product deleted successfully from ${mealType}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



export default router;
