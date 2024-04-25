"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userProfileSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    gender: { type: String, required: true },
    weight: { type: Number, required: true },
    height: { type: Number, required: true },
    age: { type: Number, required: true },
    activity: { type: String, enum: ["low", "moderate", "high"], required: true },
    bmr: { type: Number },
    bmi: { type: Number },
    dietplan: {
        breakfast: [{
                name: String,
                description: String,
                calories: Number
            }], lunch: [{
                name: String,
                description: String,
                calories: Number
            }], dinner: [{
                name: String,
                description: String,
                calories: Number
            }],
        additionalTips: [String]
    }
});
exports.default = (0, mongoose_1.model)("userProfile", userProfileSchema);
