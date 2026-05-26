import connectDB from "@/lib/db";
import TodoList from "@/models/TodoList";
import Todo from "@/models/Todo";
import TodoStats from "@/components/todo/TodoStats";
import TodoForm from "@/components/todo/TodoForm";
import TodoListComponent from "@/components/todo/TodoListComponent";
import Link from "next/link";
import getCurrentUser from "@/lib/getCurrentUser";

export default async function TodoPage({ params }) {
  await connectDB();



  const { listId } = await params;

  const user = await getCurrentUser();

if (!user) {
  redirect("/login");
}

  const todoListDoc = await TodoList.findById(listId).lean();

  if (!todoListDoc) {
    return <div className="text-zinc-500 text-center p-8">List not found</div>;
  }

  const todoList = {
    ...todoListDoc,
    _id: todoListDoc._id.toString(),
    userId: todoListDoc.userId.toString(),
    createdAt: todoListDoc.createdAt
      ? todoListDoc.createdAt.toISOString()
      : null,
    updatedAt: todoListDoc.updatedAt
      ? todoListDoc.updatedAt.toISOString()
      : null,
  };

  const rawTodos = await Todo.find({
    todoListId: listId,
  })
    .sort({ createdAt: -1 })
    .lean();

  const todos = rawTodos.map((todo) => ({
    ...todo,
    _id: todo._id.toString(),
    todoListId: todo.todoListId.toString(),
    userId: todo.userId.toString(),
    createdAt: todo.createdAt ? todo.createdAt.toISOString() : null,
    updatedAt: todo.updatedAt ? todo.updatedAt.toISOString() : null,
  }));

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <Link
            href="/tasks"
            className="flex items-center gap-2 text-zinc-400 hover:text-zinc-200 transition-colors duration-200 font-medium group"
          >
            ← Back to Tasks
          </Link>
          <h1 className="text-4xl font-bold mt-3">{todoList.title}</h1>
          <p className="text-zinc-400 mt-2">Manage tasks inside this list</p>
        </div>
      </div>

      <section className="bg-[#171717] border border-zinc-800 rounded-2xl p-6">
        <TodoStats todos={todos} />
      </section>

      <section className="bg-zinc-950/40 border border-zinc-800 rounded-2xl p-6">
        <TodoForm listId={listId} />
      </section>

      <section className="bg-[#171717] border border-zinc-800 rounded-2xl p-6">
        <TodoListComponent todos={todos} />
      </section>
    </div>
  );
}
