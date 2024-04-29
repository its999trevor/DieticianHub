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
    try{
    const {email,password}=req.body;
    let newUser=await user.findOne({email});
    if(!newUser){
        throw new Error("Invalid email");
    }
    else{
   let match=await bcrypt.compare(password, newUser.password)
    if(match){
    let token= createJwtToken(newUser); 
   
      // Example of setting a cookie in Express
      res.cookie('token', token, {
        httpOnly: true,
        secure: false, // Change to "true" in production for HTTPS
        sameSite: 'none', // Ensure secure cross-site cookie
        maxAge: 3600000, // Adjust as needed
        path: '/', // Adjust as needed
      });
    res.send("user logged in");
    }
    else{
        throw new Error("Invalid password");
    }
}
}
        catch(error:any){
            if (error.message === "Invalid email") {
                res.status(400).json({ error: "Invalid email" });
            } else if (error.message === "Invalid password") {
                res.status(400).json({ error: "Invalid password" });
            } else {
                console.error(error);
                res.status(500).send("Internal Server Error");
            }
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