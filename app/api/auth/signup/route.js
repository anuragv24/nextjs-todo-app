import connectDB from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return Response.json(
        {
          success: false,
          message: "All fields are required.",
        },
        { status: 400 },
      );
    }

    await connectDB();

    const exisitingUser = await User.findOne({
      email,
    });

    if (exisitingUser) {
      return Response.json(
        {
          success: false,
          message: "User already exists.",
        },
        { status: 400 },
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return Response.json(
      {
        success: true,
        message: "User created successfully.",
      },
      { status: 201 },
    );
  } catch (error) {
    console.log("Error :: signup ", error.message);
    return Response.json(
      {
        success: false,
        message: "Internal server error",
      },
      {
        status: 500,
      },
    );
  }
}

// signup

/*
name, email, password
check all given
is email already exist?
password hashing
create user
save in db
*/
