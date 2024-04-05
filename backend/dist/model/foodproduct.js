"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const foodProductSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    calories: { type: Number, required: true },
    fats: { type: Number, required: true },
    fibers: { type: Number, required: true },
    carbs: { type: Number, required: true },
    protein: { type: Number, required: true }
});
exports.default = (0, mongoose_1.model)("foodProduct", foodProductSchema);
