import { NextResponse } from "next/server"
import * as jose from "jose";

export async function middleware (req) {

    const {pathname} = req.nextUrl;
    
    try {
        const token = req.cookies.get("accessToken")?.value

        let isValidToken = false;
        let payload = null;

        if(token){
            try {
                const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET);
                const result = await jose.jwtVerify(token, secret);
                payload = result.payload
                isValidToken = true;

            } catch (jwtError) {
                isValidToken = false
            }
        }

        if(isValidToken && (pathname === '/login' || pathname === "/signup")){
            return NextResponse.redirect(new URL("/dashboard", req.url));
        }

        if(!isValidToken && pathname !== "/login" && pathname !== "/signup"){
            return NextResponse.redirect(new URL("/login", req.url))
        }

        return NextResponse.next();

    } catch (error) {
        console.log("Error :: middleware :: ", error.message)

        if(pathname !== "/login" && pathname !== "/signup"){
            return NextResponse.redirect(new URL("/login", req.url))
        }

        return NextResponse.next()
    }
}

export const config = {
    matcher: [
        "/login",
        "/signup",
        "/dashboard/:path*",
        "/todos/:path*"
    ]
}