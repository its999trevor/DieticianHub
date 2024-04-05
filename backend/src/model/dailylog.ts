import mongoose, { Schema,model, Document } from "mongoose";

interface DailyLog extends Document {
    userId: mongoose.Types.ObjectId;
    date: Date;
}

const dailyLogSchema = new Schema<DailyLog>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true, default: Date.now },
});
export default model<DailyLog>("DailyLog",dailyLogSchema)