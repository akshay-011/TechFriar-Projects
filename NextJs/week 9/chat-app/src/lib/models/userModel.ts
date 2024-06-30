import mongoose, { Model, Schema, model } from "mongoose";
import UserSchemaInterface from "../types/userType";
import bcrypt from "bcrypt";

import chatSchema from "./chatSchema";

const userSchema = new Schema<UserSchemaInterface>({
    username: {
        type: String,
        unique: true,
        required:true,
        index:true
    },
    name: {
        type: String,
        required:true
    },
    phoneNumber: {
        type: String,
        unique: true,
        required:true,
        index:true
    },
    password: {
        type: String,
        required:true
    },
    chatID: {
        type: String
    },
    chatHistory:{
        type:[chatSchema]
    }
});

userSchema.pre<UserSchemaInterface>('save', async function(next){
    this.chatID = `chat@${this.phoneNumber}`;
    // encrypting password
    const salt:string = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
});

let userModel: Model<UserSchemaInterface>;

if (mongoose.models.UserModel) {
    userModel = mongoose.model('UserModel') as Model<UserSchemaInterface>;
} 
else {
    userModel = mongoose.model<UserSchemaInterface>("UserModel", userSchema);
}

export default userModel;
