import express from "express";
import userProfile from "../model/userprofile";
import { verifyToken } from "../utils/auth";


enum Activity {
    low = "low",
    moderate = "moderate",
    high = "high"
}

const router = express.Router();

router.post("/",verifyToken, async (req, res) => {
    try {
        const { weight, height, age, activity } = req.body;
        if (!(activity in Activity)) {
            throw new Error("Invalid activity value");
        }

       
        const userId = req.user._doc._id;

        const newProfile = new userProfile({ userId, weight, height, age, activity });
        await newProfile.save();
        
        res.send("UserProfile added",);
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
});
router.get("/:userId",verifyToken,async (req,res) => {
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
router.put("/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const { weight, height, age, activity } = req.body;
        const updatedProfile = await userProfile.updateOne(
            { userId: userId }, 
            { $set: { weight, height, age, activity } } 
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
