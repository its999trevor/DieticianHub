import express from "express";
import Meal from "../model/meal";
import FoodProduct from "../model/foodproduct";
import { verifyToken } from "../utils/auth";
import dailylog from "../model/dailylog";


const router = express.Router();

type MealType = {
    breakfast: {
        foodProducts: {
            foodProduct: string;
            quantity: number;
            addedAt: Date;
        }[];
        calories: number;
    };
    lunch: {
        foodProducts: {
            foodProduct: string;
            quantity: number;
            addedAt: Date;
        }[];
        calories: number;
    };
    dinner: {
        foodProducts: {
            foodProduct: string;
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
            console.log(entry.foodProduct);
            const foodProduct = await FoodProduct.findById(entry.foodProduct);
            if (foodProduct) {
                const calories = foodProduct.calories * entry.quantity;
                meal.mealType[mealType].foodProducts.push({
                    foodProduct: entry.foodProduct,
                    quantity: entry.quantity,
                    addedAt: new Date()
                });
                meal.mealType[mealType].calories += calories;
                meal.totalCalories += calories;
            }
        }

        await meal.save();

        res.send(`Food products added to ${mealType} successfully`);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

export default router;
