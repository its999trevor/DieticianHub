import express from "express";
import bcrypt from "bcrypt";
import user from "../model/user";
import { createJwtToken } from "../utils/auth";
const router= express.Router();

const saltRounds = 10;
router.post("/signup",async(req,res)=>{
        const{name,email,password}=req.body;
        let hashPassword=await bcrypt.hash(password,saltRounds);                
        let newUser=new user({name,email,password:hashPassword});
        await newUser.save();
        res.send("new user added");

})
router.post("/login",async (req,res) => {
    const {email,password}=req.body;
    let newUser=await user.findOne({email});
    if(!newUser){
        res.send("not a valid email")
       throw new Error ("Not a valid email");
    }
   let match=await bcrypt.compare(password, newUser.password)
    if(match){
    let token= createJwtToken(newUser); 
    res.cookie("token",token);
    res.send("user logged in");
    }
    else{
        res.send("not a valid password")
    }
})

router.get("/logout",(req,res)=>{
    res.cookie("token","",{expires:new Date(0)});
    res.send("logged out successfully");
})

router.delete("/deleteUser/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const deletedUser = await user.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).send("User not found");
        }

        res.send("User deleted successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
export default router;