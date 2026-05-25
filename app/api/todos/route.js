import connectDB from "@/lib/db";
import getCurrentUser from "@/lib/getCurrentUser";
import Todo from "@/models/Todo";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { todo, todoListId } = body;

    if (!todo || !todoListId) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields",
        },
        { status: 400 },
      );
    }

    await connectDB();

    const user = await getCurrentUser();
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 },
      );
    }

    const newTodo = await Todo.create({
      text: todo,
      isCompleted: false,
      todoListId: todoListId,
      userId: user._id,
    });

    return NextResponse.json(
      {
        success: true,
        message: "New todo added successfully",
      },
      { status: 201 },
    );
  } catch (error) {
    console.log("Error creating todo: ", error.message);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    );
  }
}
