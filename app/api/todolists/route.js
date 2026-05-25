import getCurrentUser from "@/lib/getCurrentUser";
import Todo from "@/models/Todo";
import TodoList from "@/models/TodoList";

export async function POST(req){
    try {
        const body = await req.json();
        const {title} = body;

        if(!title) {
            return Response.json({
                success: false,
                message: "Title is required."
            }, {status: 400})
        }

        const user = await getCurrentUser();
        if(!user) {
            return Response.json({
                success: false,
                message: "User not found",
            }, {status: 404})
        }

        const newTodoList = await TodoList.create({
            title: title,
            userId: user._id,
        })

        return Response.json({
            success: true,
            message: "New TodoList Created Successfully.",
            todoList: {
                title: newTodoList.title,
                _id: newTodoList._id,

            }
        }, {status: 201})

    } catch (error) {
        console.log(error.message)
        return Response.json({success: false, message: "server error"}, {status:500})
    }
}

export async function DELETE(req){
    try {
        const {todoListId} = await req.json();
        await Todo.deleteMany({ todoListId: todoListId });
        const deletedList = await TodoList.findByIdAndDelete(todoListId);

        if(!deletedList){
            return Response.json({
                success: false,
                message: "Todo list not found",
            }, {status: 404});
        } 
        return Response.json({
            success: true,
            message: "Todo List deleted",
        }, {status: 201})
    } catch (error) {
        console.log("Error while deleting todolist :: ", error.message)
        return Response.json({
            success: false,
            message: "Internal Server Error",
        }, {status: 500})
    }
}

/*
todo title,
check,
db calling. 
*/ 

