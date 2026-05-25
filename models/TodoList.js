import mongoose from "mongoose";

const todoListSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
}, {timestamps: true})

const TodoList = mongoose.models.TodoList || mongoose.model("TodoList", todoListSchema)

export default TodoList