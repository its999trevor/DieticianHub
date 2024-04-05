import mongoose, { Schema,model, Document } from "mongoose";
interface UserProfile extends Document {
    userId: mongoose.Types.ObjectId;
    weight: number;
    height: number;
    age: number;
    activity: string;
}
const userProfileSchema = new Schema<UserProfile>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    weight: { type: Number, required: true },
    height: { type: Number, required: true },
    age: { type: Number, required: true },
    activity: { type: String, enum:["low","moderate","high"], required: true }
});
export default model<UserProfile>("userProfile",userProfileSchema)