"use server"

import userModel from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import connectDB from "../connectDB";

async function loginAction(formData:FormData) {

    await connectDB();

    const phoneNumber:any = formData.get("phoneNumber");
    const password:any = formData.get("password");

    const id = "chat@"+phoneNumber; // unique id to every user
    try{
        const user = await userModel.findOne({ chatID:id });
        const secretKey:string = process.env.secretKey || "my Secret"
    
        if(!user){
            return {
                status:404,
                message:"User not found",
                token:""
            }
        }
    
        const result = await bcrypt.compare(password, user.password);    
    
        if(result){
            const token = jwt.sign({ chatId:user.chatID}, secretKey, {
                expiresIn:"12h"
            });
            return {
                status:200,
                message:"Succesfully loged in",
                token:token
            }
        }
        else{
            return {
                status:402,
                message:"invalid password",
                token:""
            }
        }
    }
    catch(err){
        console.log("User log in found error ", err);
        return {
            status:404,
            message:"User not found",
            token:""
        }
    }


}

export default loginAction;