"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mealSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    mealType: {
        breakfast: {
            foodProducts: [{
                    foodProduct: { type: mongoose_1.Schema.Types.ObjectId, ref: "FoodProduct", required: true },
                    quantity: { type: Number, required: true },
                    addedAt: { type: Date, default: Date.now },
                }],
            calories: { type: Number, default: 0 }
        },
        lunch: {
            foodProducts: [{
                    foodProduct: { type: mongoose_1.Schema.Types.ObjectId, ref: "FoodProduct", required: true },
                    quantity: { type: Number, required: true },
                    addedAt: { type: Date, default: Date.now },
                }],
            calories: { type: Number, default: 0 }
        },
        dinner: {
            foodProducts: [{
                    foodProduct: { type: mongoose_1.Schema.Types.ObjectId, ref: "FoodProduct", required: true },
                    quantity: { type: Number, required: true },
                    addedAt: { type: Date, default: Date.now },
                }],
            calories: { type: Number, default: 0 }
        }
    },
    totalCalories: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});
exports.default = (0, mongoose_1.model)("Meal", mealSchema);
