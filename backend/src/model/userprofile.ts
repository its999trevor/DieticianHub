import mongoose, { Schema,model, Document } from "mongoose";
interface UserProfile extends Document {
    userId: mongoose.Types.ObjectId;
    gender:string;
    weight: number;
    height: number;
    age: number;
    activity: string;
    bmr: number;
    bmi: number;
}
const userProfileSchema = new Schema<UserProfile>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    gender: { type: String, required: true },
    weight: { type: Number, required: true },
    height: { type: Number, required: true },
    age: { type: Number, required: true },
    activity: { type: String, enum:["low","moderate","high"], required: true },
    bmr: {type:Number},
    bmi: {type:Number}
    
    
});
export default model<UserProfile>("userProfile",userProfileSchema)