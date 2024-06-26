"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const meal_1 = __importDefault(require("../model/meal"));
const foodproduct_1 = __importDefault(require("../model/foodproduct"));
const auth_1 = require("../utils/auth");
const dailylog_1 = __importDefault(require("../model/dailylog"));
const userprofile_1 = __importDefault(require("../model/userprofile"));
const router = express_1.default.Router();
router.post("/:mealType", auth_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { foodProducts, date } = req.body;
        const userId = req.user._doc._id;
        const mealType = req.params.mealType.toLowerCase();
        if (!Array.isArray(foodProducts)) {
            return res.status(400).json({ error: 'Invalid foodProducts data' });
        }
        const specifiedDate = new Date(date);
        const startOfDay = new Date(specifiedDate.setHours(0, 0, 0, 0));
        let meal = yield meal_1.default.findOne({ userId, createdAt: { $gte: startOfDay, $lt: new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000) } });
        if (!meal) {
            meal = new meal_1.default({ userId, createdAt: startOfDay, mealType: {} });
        }
        if (!meal.mealType[mealType]) {
            meal.mealType[mealType] = { foodProducts: [], calories: 0 };
        }
        for (const entry of foodProducts) {
            const existingFoodProduct = meal.mealType[mealType].foodProducts.find((item) => item.productid == entry.productid);
            const foodProduct = yield foodproduct_1.default.findById(entry.productid);
            if (foodProduct) {
                const calories = foodProduct.calories * entry.quantity;
                if (existingFoodProduct) {
                    existingFoodProduct.quantity += entry.quantity;
                }
                else {
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
        yield meal.save();
        const userDailyLog = yield dailylog_1.default.findOne({ userId });
        if (userDailyLog) {
            const currentLog = userDailyLog.logs.find(log => log.date.getTime() === startOfDay.getTime());
            if (!currentLog) {
                userDailyLog.logs.push({
                    date: new Date(startOfDay),
                    mealeaten: meal._id
                });
            }
            yield userDailyLog.save();
        }
        else {
            const newDailyLog = new dailylog_1.default({
                userId,
                logs: [{
                        date: new Date(startOfDay),
                        mealeaten: meal._id
                    }]
            });
            yield newDailyLog.save();
        }
        res.status(200).json({ message: `Food products added to ${mealType} successfully` });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}));
router.get("/allmeals", auth_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user._doc._id;
    // console.log(userId);
    const currentDate = new Date().setHours(0, 0, 0, 0);
    let data = yield meal_1.default.findOne({ userId, createdAt: { $gte: currentDate } }).populate("mealType.breakfast.foodProducts.productid")
        .populate("mealType.lunch.foodProducts.productid")
        .populate("mealType.dinner.foodProducts.productid");
    res.json(data);
}));
router.get("/mealdata", auth_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._doc._id;
        // console.log(userId);
        const currentDate = new Date().setHours(0, 0, 0, 0);
        let data = yield meal_1.default.findOne({ userId, createdAt: { $gte: currentDate } })
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
            for (const mealTypeKey of Object.keys(data.mealType)) {
                const mealType = data.mealType[mealTypeKey];
                mealType.foodProducts.forEach(foodProduct => {
                    const product = foodProduct.productid;
                    if (typeof product === 'object' && product !== null) {
                        TotalProtein += product.protein * foodProduct.quantity;
                        TotalFats += product.fats * foodProduct.quantity;
                        TotalFiber += product.fibers * foodProduct.quantity;
                        TotalCarbs += product.carbs * foodProduct.quantity;
                    }
                });
            }
            const userProfileData = yield userprofile_1.default.findOne({ userId });
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
    }
    catch (error) {
        console.error("Error fetching meal data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
router.get("/mealbydate", auth_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._doc._id;
        const dateParam = req.query.date;
        // console.log(dateParam)
        const date = new Date(dateParam);
        const data = yield meal_1.default.find({ userId, createdAt: { $gte: date, $lt: new Date(date.getTime() + 24 * 60 * 60 * 1000) } }).populate("mealType.breakfast.foodProducts.productid")
            .populate("mealType.lunch.foodProducts.productid")
            .populate("mealType.dinner.foodProducts.productid");
        res.json(data);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
router.delete("/deleteproduct/", auth_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId, mealType, date } = req.query;
        const userId = req.user._doc._id;
        console.log(productId, typeof (productId), "     ", mealType);
        const validMealTypes = ["breakfast", "lunch", "dinner"];
        if (!validMealTypes.includes(mealType)) {
            return res.status(400).json({ error: "Invalid meal type" });
        }
        const currdate = new Date(date);
        const meal = yield meal_1.default.findOne({ userId, createdAt: { $gte: date, $lt: new Date(currdate.getTime() + 24 * 60 * 60 * 1000) } });
        if (!meal) {
            return res.status(404).json({ error: "No meal found for the user" });
        }
        const mealTypeData = meal.mealType[mealType];
        // console.log("mealtype", mealTypeData);
        if (!mealTypeData) {
            return res.status(404).json({ error: `No ${mealType} found in the meal` });
        }
        const index = mealTypeData.foodProducts.findIndex(foodProduct => (foodProduct.productid).toString() === productId);
        console.log("index: ", index);
        if (index === -1) {
            return res.status(404).json({ error: "Food product not found in the specified meal type" });
        }
        // Get the calories of the food product being deleted
        const deletedFoodProduct = mealTypeData.foodProducts[index];
        const deletedProduct = yield foodproduct_1.default.findById(deletedFoodProduct.productid);
        if (!deletedProduct) {
            return res.status(404).json({ error: "Food product not found" });
        }
        const deletedProductCalories = deletedProduct.calories * deletedFoodProduct.quantity;
        // Subtract the calories from the meal type and total calories
        mealTypeData.calories -= deletedProductCalories;
        meal.totalCalories -= deletedProductCalories;
        // Remove the food product from the meal type
        mealTypeData.foodProducts.splice(index, 1);
        yield meal.save();
        res.json({ message: `Food product deleted successfully from ${mealType}` });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
exports.default = router;
