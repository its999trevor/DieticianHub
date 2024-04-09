import mongoose, { Schema,model, Document } from "mongoose";

interface DailyLog extends Document {
    userId: mongoose.Types.ObjectId;
    date: Date;
    mealeaten:mongoose.Types.ObjectId[];
}

const dailyLogSchema = new Schema<DailyLog>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true, default: Date.now },
    mealeaten:[{type: Schema.Types.ObjectId, ref:"Meal", required:true}]

});
dailyLogSchema.index({ userId: 1, date: 1 }, { unique: true });
export default model<DailyLog>("DailyLog",dailyLogSchema)