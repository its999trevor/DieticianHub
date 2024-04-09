"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const dailyLogSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true, default: Date.now },
    mealeaten: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Meal", required: true }]
});
dailyLogSchema.index({ userId: 1, date: 1 }, { unique: true });
exports.default = (0, mongoose_1.model)("DailyLog", dailyLogSchema);
