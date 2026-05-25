import connectDB from "@/lib/db";
import Todo from "@/models/Todo";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  try {
    await connectDB();
    const { todoId } = await params;
    const body = await req.json();

    const updateData = {};
    if (body.text !== undefined) updateData.text = body.text;
    if (body.isCompleted !== undefined)
      updateData.isCompleted = body.isCompleted;

    const updatedTodo = await Todo.findByIdAndUpdate(
      todoId,
      { $set: updateData },
      { new: true },
    );

    if (!updatedTodo) {
      return NextResponse.json(
        {
          success: false,
          messagae: "Todo not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { success: true, message: "Todo updated" },
      { status: 201 },
    );
  } catch (error) {
    console.log("Patch error :: ", error.message);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { todoId } = await params;

    const deletedTodo = await Todo.findByIdAndDelete(todoId);
    if (!deletedTodo) {
      return NextResponse.json(
        {
          success: false,
          message: "Todo not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Todo deleted successfully",
      },
      { statua: 201 },
    );
  } catch (error) {
    console.log("DELETE Error:", error.message);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
