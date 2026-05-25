import connectDB from "@/lib/db";
import GenerateAccessToken from "@/lib/generateAccessToken";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return Response.json(
        {
          success: false,
          message: "All fields are required.",
        },
        { status: 400 },
      );
    }

    await connectDB();

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "Invalid credentials.",
        },
        { status: 400 },
      );
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return Response.json(
        {
          success: false,
          message: "Wrong credentials.",
        },
        { status: 400 },
      );
    }

    const accessToken = GenerateAccessToken(user);

    const response = NextResponse.json(
      {
        success: true,
        message: "Login successful",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 200 },
    );

    response.cookies.set({
      name: "accessToken",
      value: accessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: Number(process.env.ACCESS_TOKEN_EXPIRY),
      path: "/",
    });

    return response;
  } catch (error) {
    console.log("Error :: Login ", error.message);
    return Response.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    );
  }
}

/*
email, passord
all check
db connection
email check -> user -> password check
jwt token
set cookies
response send
*/
