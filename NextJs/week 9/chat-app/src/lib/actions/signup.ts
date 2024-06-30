"use server"

import connectDB from "../connectDB";
import userModel from "../models/userModel";

interface Data {

}

async function signUp(data:FormData) {

    await connectDB();

    try{
        const user = new userModel({
            name:data.get('name'),
            password:data.get("password"),
            username:data.get("username"),
            phoneNumber:data.get("phoneNumber")
        });

        const result = await user.save()
        if(result){
            console.log("Creation success ", result);
            return {
                status:200
            }
        }
        else{
            console.log("User creation Error ", result);
        }

    }
    catch(err:any ) {
        console.log("User create failed ", err);
        if("code" in err && err.code === 11000){
            return {
                status:402,
                message:"Duplicate error",
                values:err.keyValue
            }
        }
        return {
            status:400
        }
    }
    
}

export default signUp;