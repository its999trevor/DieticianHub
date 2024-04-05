import mongoose, { Schema,model, Document } from "mongoose";
interface Meal extends Document {
    userId: mongoose.Types.ObjectId;
    mealType: string;
    foodProducts: {
        foodProductId: mongoose.Types.ObjectId;
        quantity: number;
    }[];
    totalCalories: number;
}
const mealSchema = new Schema<Meal>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    mealType: { type: String, enum: ["breakfast", "lunch", "dinner"], required: true },
    foodProducts: [{
        foodProductId: { type: Schema.Types.ObjectId, ref: "foodProduct", required: true },
        quantity: { type: Number, required: true }
    }],
    totalCalories: { type: Number, default: 0 } 
});
export default model<Meal>("meal",mealSchema)