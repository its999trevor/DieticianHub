"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const dailyLogSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    logs: [
        {
            date: { type: Date, required: true },
            mealeaten: { type: mongoose_1.Schema.Types.ObjectId, ref: "Meal", required: true }
        }
    ]
});
exports.default = (0, mongoose_1.model)("DailyLog", dailyLogSchema);
