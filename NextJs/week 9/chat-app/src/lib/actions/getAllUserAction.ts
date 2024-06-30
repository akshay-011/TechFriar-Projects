"use server"
import connectDB from "../connectDB";
import userModel from "../models/userModel";
import UserSchemaInterface from "../types/userType";

export default async function getAlluserAction (){
    await connectDB();

    const users:UserSchemaInterface[]| any = await userModel.find();
    if(!users){
        return{
            status:500,
            data:[]
        }
    }
    return {
        status:200,
        data:users
    }

}