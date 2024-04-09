import { Document, Schema, model, Types } from "mongoose";

export  interface FoodProductEntry {
    productid: Types.ObjectId; 
    quantity: number;
    addedAt: Date; 
}

export interface Meal extends Document {
    userId: Types.ObjectId;
    mealType:{
    breakfast: {
        foodProducts: FoodProductEntry[];
        calories: number;
    };
    lunch: {
        foodProducts: FoodProductEntry[];
        calories: number;
    };
    dinner: {
        foodProducts: FoodProductEntry[];
        calories: number;
    };
}
    totalCalories: number; 
    createdAt: Date; 
}

const mealSchema = new Schema<Meal>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    mealType:{
    breakfast: {
        foodProducts: [{
            productid: { type: Schema.Types.ObjectId, ref: "FoodProduct", required: true },
            quantity: { type: Number, required: true },
            addedAt: { type: Date, default: Date.now },
        }],
        calories: { type: Number, default: 0 }
    },
    lunch: {
        foodProducts: [{
            productid: { type: Schema.Types.ObjectId, ref: "FoodProduct", required: true },
            quantity: { type: Number, required: true },
            addedAt: { type: Date, default: Date.now },
        }],
        calories: { type: Number, default: 0 }
    },
    dinner: {
        foodProducts: [{
            productid: { type: Schema.Types.ObjectId, ref: "FoodProduct", required: true },
            quantity: { type: Number, required: true },
            addedAt: { type: Date, default: Date.now },
        }],
        calories: { type: Number, default: 0 }
    }
},
    totalCalories: { type: Number, default: 0 }, 
    createdAt: { type: Date, default: Date.now } 
});

export default model<Meal>("Meal", mealSchema);
