import express from "express";
import dailylog from "../model/dailylog";
import { verifyToken } from "../utils/auth";

const router = express.Router();
router.get("/",verifyToken,async(req,res)=>{
    const userId=req.user._doc._id;
    let data=await dailylog.find({userId}).populate("logs.mealeaten");
    res.json(data);
    
})

export default router