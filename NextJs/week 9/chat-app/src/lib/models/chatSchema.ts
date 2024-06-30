import { Schema } from "mongoose";


const chat = new Schema({
    message:String,
    date:Date,
    types:String
});

const chatSchema = new Schema({
    userId:String,
    chats:[chat]
});

export default chatSchema;