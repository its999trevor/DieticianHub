"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mealSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    mealType: { type: String, enum: ["breakfast", "lunch", "dinner"], required: true },
    foodProducts: [{
            foodProductId: { type: mongoose_1.Schema.Types.ObjectId, ref: "foodProduct", required: true },
            quantity: { type: Number, required: true }
        }],
    totalCalories: { type: Number, default: 0 }
});
exports.default = (0, mongoose_1.model)("meal", mealSchema);
