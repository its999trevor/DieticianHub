import { Schema, model, Document } from "mongoose";

interface DailyLog extends Document {
    userId: Schema.Types.ObjectId;
    logs: {
        date: Date;
        mealeaten: Schema.Types.ObjectId;
    }[];
}

const dailyLogSchema = new Schema<DailyLog>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    logs: [
        {
            date: { type: Date, required: true },
            mealeaten: { type: Schema.Types.ObjectId, ref: "Meal", required: true }
            
        }
    ]
});

export default model<DailyLog>("DailyLog", dailyLogSchema);
