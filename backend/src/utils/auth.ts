import jwt from "jsonwebtoken";
import express, {Request,Response, NextFunction } from "express";
const secretKey=process.env.JWT_SECRET as string
interface User{
    name:string;
    email:string;
    password:string;
}
export const createJwtToken=(user:User)=>{
    const plainUser = { ...user };
    return jwt.sign(plainUser,secretKey,{expiresIn:"24h"})
}

export const verifyToken=(req:Request,res:Response,next:NextFunction)=>{
    // console.log(req.cookies);
    let token=req.cookies.token;
    let decode=jwt.verify(token,secretKey);
    // console.log(decode);
    if(decode){
        req.user=decode;
       return next();
    }
    res.send("token invalid");
}