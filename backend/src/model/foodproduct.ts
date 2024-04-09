import mongoose, { Schema,model, Document } from "mongoose";
interface FoodProduct extends Document {
    name: string;
    calories: number;
    fats: number;
    fibers: number;
    carbs: number;
    protein: number;
}
const foodProductSchema = new Schema<FoodProduct>({
    name: { type: String, required: true, strictQuery: false },
    calories: { type: Number, required: true },
    fats: { type: Number, required: true },
    fibers: { type: Number, required: true },
    carbs: { type: Number, required: true },
    protein: { type: Number, required: true }
});
export default model<FoodProduct>("foodProduct",foodProductSchema)