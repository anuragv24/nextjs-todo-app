// mongoDB connection

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI

if(!MONGODB_URI){
    throw new Error("Please define MONGODB_URI")
}

let cached = global.mongoose;

if(!cached){
    cached = global.mongoose = {
        conn: null,
        promise: null,
    };
}

async function connectDB(){
try {
        if(cached.conn){
            return cached.conn;
        }
        
        if(!cached.promise){
            const options = {
                bufferCommands: false,
            };
    
            cached.promise = mongoose.connect(
                MONGODB_URI,
                options
            ).then((mongoose) => {
                return mongoose
            })
        }
        cached.conn = await cached.promise
        return cached.conn;
    }
catch (error) {
    console.log("Error :: mongodb connection failed: ", error.message)
}
}
export default connectDB