import { cookies } from "next/headers";
import connectDB from "./db";
import jwt from "jsonwebtoken"
import User from "@/models/User";


export default async function getCurrentUser(){
    try {
        await connectDB();
        
        const cookieStore = await cookies();

        const token = cookieStore.get("accessToken")?.value;

        if(!token){
            return null
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decoded._id).select("-password");

        console.log("user from getCurrentUser :: ", user.name)

        return user;

    } catch (error) {
        console.log("Error :: get currentUser : ", error.message)
        return null;
    }
}