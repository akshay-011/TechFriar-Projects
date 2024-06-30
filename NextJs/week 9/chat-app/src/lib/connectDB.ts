import mongoose from "mongoose";

interface Connection {
 isConnected?: boolean;
}

const connection: Connection = {};

async function connectDB(){
    if(connection.isConnected){
        return;
    }

    if(process.env.DB_URL === undefined){
        console.log("[*] No Databse Url Found !!");
        return false;
    }
    const db = await mongoose.connect(process.env.DB_URL, {
        autoIndex: true,
    });
    console.log("[*] Databse Connected");

    connection.isConnected = db.connections[0].readyState === 1;
}

export default connectDB;