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
            console.log(entry.foodProduct);
            const foodProduct = yield foodproduct_1.default.findById(entry.foodProduct);
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
        yield meal.save();
        res.send(`Food products added to ${mealType} successfully`);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}));
exports.default = router;
