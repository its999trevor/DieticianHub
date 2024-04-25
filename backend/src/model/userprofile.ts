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
    dietplan:dietplan;
}
interface food{
    name:string,
    description:string,
    calories:number
}
interface dietplan{
    
        breakfast:[food]
        ,
        lunch:[food]
        ,
        dinner:[food],
        
    additionalTips:[string]
}
const userProfileSchema = new Schema<UserProfile>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    gender: { type: String, required: true },
    weight: { type: Number, required: true },
    height: { type: Number, required: true },
    age: { type: Number, required: true },
    activity: { type: String, enum:["low","moderate","high"], required: true },
    bmr: {type:Number},
    bmi: {type:Number},
    dietplan:{
        breakfast:[{
            name:String,
            description:String,
            calories:Number
        }],lunch:[{
            name:String,
            description:String,
            calories:Number
        }],dinner:[{
            name:String,
            description:String,
            calories:Number
        }],
        additionalTips:[String]
    }
    
    
});
export default model<UserProfile>("userProfile",userProfileSchema)