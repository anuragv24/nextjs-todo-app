import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json(
      {
        success: true,
        message: "Logout successful",
      }, {status: 200}
    )

    response.cookies.set({
      name: "accessToken",
      value: "",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
      expires: new Date(0),
      path: "/",
    });

    return response;
  } catch (error) {
    console.log("Error :: Logout", error.message);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    );
  }
}
