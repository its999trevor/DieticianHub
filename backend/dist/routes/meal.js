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
const router = express_1.default.Router();
router.post("/:mealType", auth_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { foodProducts } = req.body;
        const userId = req.user._doc._id;
        const mealType = req.params.mealType.toLowerCase();
        const currentDate = new Date().setHours(0, 0, 0, 0);
        let meal = yield meal_1.default.findOne({ userId, createdAt: { $gte: currentDate } });
        if (!meal) {
            meal = new meal_1.default({ userId, mealType: {} });
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
                meal.totalCalories += calories;
            }
        }
        yield meal.save();
        const userDailyLog = yield dailylog_1.default.findOne({ userId });
        if (userDailyLog) {
            const currentLog = userDailyLog.logs.find(log => log.date.getTime() === currentDate);
            if (currentLog) {
                if (!currentLog.mealeaten.includes(meal._id)) {
                    currentLog.mealeaten.push(meal._id);
                }
            }
            else {
                userDailyLog.logs.push({
                    date: new Date(currentDate),
                    mealeaten: [meal._id]
                });
            }
            yield userDailyLog.save();
        }
        else {
            const newDailyLog = new dailylog_1.default({
                userId,
                logs: [{
                        date: new Date(currentDate),
                        mealeaten: [meal._id]
                    }]
            });
            yield newDailyLog.save();
        }
        res.send(`Food products added to ${mealType} successfully`);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}));
router.get("/allmeals", auth_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user._doc._id;
    console.log(userId);
    const currentDate = new Date().setHours(0, 0, 0, 0);
    let data = yield meal_1.default.findOne({ userId, createdAt: { $gte: currentDate } }).populate("mealType.breakfast.foodProducts.productid")
        .populate("mealType.lunch.foodProducts.productid")
        .populate("mealType.dinner.foodProducts.productid");
    res.json(data);
}));
exports.default = router;
