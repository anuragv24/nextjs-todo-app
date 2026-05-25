import connectDB from "@/lib/db";
import TodoList from "@/models/TodoList";
import Todo from "@/models/Todo";
import TodoStats from "@/components/todo/TodoStats";
import TodoForm from "@/components/todo/TodoForm";
import TodoListComponent from "@/components/todo/TodoListComponent";
import Link from "next/link";
import LogoutButton from "@/components/todo/LogoutButton";

export default async function TodoPage({ params }) {
  await connectDB();

  const { listId } = await params;

  const todoListDoc = await TodoList.findById(listId).lean();

  if (!todoListDoc) {
    return <div className="text-zinc-500 text-center p-8">List not found</div>;
  }

  const todoList = {
    ...todoListDoc,
    _id: todoListDoc._id.toString(),
    userId: todoListDoc.userId.toString(),
    createdAt: todoListDoc.createdAt ? todoListDoc.createdAt.toISOString() : null,
    updatedAt: todoListDoc.updatedAt ? todoListDoc.updatedAt.toISOString() : null,
  };

  const rawTodos = await Todo.find({
    todoListId: listId,
  }).sort({ createdAt: -1 }).lean();

 const todos = rawTodos.map(todo => ({
    ...todo,
    _id: todo._id.toString(),
    todoListId: todo.todoListId.toString(),
    userId: todo.userId.toString(),
    createdAt: todo.createdAt ? todo.createdAt.toISOString() : null,
    updatedAt: todo.updatedAt ? todo.updatedAt.toISOString() : null,
  }));

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex items-center justify-center p-4 md:p-8 antialiased">
      
      <main className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl p-6 md:p-8 space-y-8">

        <div className="flex items-center justify-between text-sm border-b border-zinc-800/60 pb-4">
          <Link 
            href="/dashboard" 
            className="flex items-center gap-2 text-zinc-400 hover:text-zinc-200 transition-colors duration-200 font-medium group"
          >
            <span className="transform group-hover:-translate-x-0.5 transition-transform duration-200">←</span>
            Back to Dashboard
          </Link>

          <LogoutButton />
        
        </div>


        <section className="text-center border-b border-zinc-800 pb-6">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-100">
            {todoList.title}
          </h1>
        </section>

        <section>
          <TodoStats todos={todos} />
        </section>

        <section className="space-y-6 bg-zinc-950/40 border border-zinc-800/60 rounded-xl p-5 md:p-6">
          {" "}
          <TodoForm listId={listId} />
          <TodoListComponent todos={todos} />
        </section>
      </main>
    </div>
  );
}
