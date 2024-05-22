import express from "express";
import userProfile from "../model/userprofile";
import { verifyToken } from "../utils/auth";


enum Activity {
    low = "low",
    moderate = "moderate",
    high = "high"
}
enum Gender{
    male="male",
    female="female"
}

const router = express.Router();

router.post("/newuser/:userId", async (req, res) => {
    try {
        const {gender, weight, height, age, activity } = req.body;
        if (!(activity in Activity)) {
            throw new Error("Invalid activity value");
        }

       
        const userId = req.params.userId;
        let bmr;
        if(!bmr){
        if(gender==Gender.male){
             bmr=(10*weight)+(6.25*height)-(5*age)+5;
        }
        if(gender==Gender.female){
          bmr=(10*weight)+(6.25*height)-(5*age)-161;
        }
    }
        if(bmr){
        if(activity==Activity.low){
            bmr=bmr*1.375;
        }
        if(activity==Activity.moderate){
            bmr=bmr*1.55;
        }
        if(activity==Activity.high){
            bmr=bmr*1.725;
        }
        bmr=bmr.toFixed(0);
    }   let heightinm=height/100;
        let bmi=weight/Math.pow(heightinm,2);
        bmi=parseFloat(bmi.toFixed(2));
        const newProfile = new userProfile({gender, userId, weight, height, age, activity,bmr,bmi });
        await newProfile.save();
        
        res.send("UserProfile added",);
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
});
router.get("/profile/:userId",verifyToken,async (req,res) => {
   try{
    const userId = req.params.userId;
    // console.log(userId);
    const profile = await userProfile.findOne({ userId});
    if (!profile) {
        return res.status(404).send("User profile not found");
    }
    res.json(profile);
}


catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
}

})
router.get("/userdata",verifyToken,async (req,res) => {
   try{
    const userId=req.user._doc._id;
    // console.log(userId);
    const profile = await userProfile.findOne({ userId});
    if (!profile) {
        return res.status(404).send("User profile not found");
    }
    res.json(profile);
}


catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
}

})
router.put("/updateuser/",verifyToken, async (req, res) => {
    try {
        const userId = req.user._doc._id;
        const { gender,weight, height, age, activity } = req.body;
        let bmr;
        if(!bmr){
        if(gender==Gender.male){
             bmr=(10*weight)+(6.25*height)-(5*age)+5;
        }
        if(gender==Gender.female){
          bmr=(10*weight)+(6.25*height)-(5*age)-161;
        }
    }
        if(bmr){
        if(activity==Activity.low){
            bmr=bmr*1.375;
        }
        if(activity==Activity.moderate){
            bmr=bmr*1.55;
        }
        if(activity==Activity.high){
            bmr=bmr*1.725;
        }
        bmr=bmr.toFixed(0);
    }   let heightinm=height/100;
        let bmi=weight/Math.pow(heightinm,2);
        bmi=parseFloat(bmi.toFixed(2));

        const updatedProfile = await userProfile.updateOne(
            { userId: userId }, 
            { $set: { weight, height, age, activity,bmr,bmi } } 
        );
         
        res.json({ message: "User profile updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
router.delete("/:userId",async (req,res)=>{
    try{
        const userId=req.params.userId;
        await userProfile.findOneAndDelete({userId});
        res.send("user deleted");
    }
    catch(err){
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
})
export default router;
