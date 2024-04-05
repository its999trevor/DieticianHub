import mongoose, { Schema, model, Document } from "mongoose";

interface User extends Document {
    name: string;
    email: string;
    password: string;
}

const UserSchema: Schema<User> = new Schema<User>({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }
});

export default model<User>("User", UserSchema);
