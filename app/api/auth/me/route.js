
import User from "@/models/User";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken"
import connectDB from "@/lib/db";


export async function GET(){
    try {
        await connectDB();
        const cookieStore = await cookies();

        const token = cookieStore.get("accessToken")?.value

        if(!token){
            return Response.json({
                success: false,
                message: "Authentication required. Log in again."
            },{status: 401})
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decoded._id)

        if(!user){
            return Response.json({
                success: false,
                message: "User not found"
            }, {status: 404})
        }
        
        return Response.json({
            success: true,
            message: "User Authentication",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        }, {status: 200})

    } catch (error) {
        console.log("Error :: me ", error.message);
        return Response.json({
            success: false,
            message: "Internal server error"
        }, {status: 500})
    }
}