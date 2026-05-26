import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },

    status: {
        type: String,
        enum: ["pending", "in-progress", "completed"],
        default: "pending"
    },

    todoListId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TodoList",
        required: true
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
}, { timestamps: true })

const Todo = mongoose.models.Todo || mongoose.model("Todo", TodoSchema)

export default Todo