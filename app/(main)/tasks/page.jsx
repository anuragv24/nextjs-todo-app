import CreateTodoListForm from "@/components/todo/CreateTodoListForm";
import TodoListCard from "@/components/todo/TodoListCard";
import connectDB from "@/lib/db";
import getCurrentUser from "@/lib/getCurrentUser";
import TodoList from "@/models/TodoList";
import { redirect } from "next/navigation";

function transformTodo(todoDoc) {
  return {
    _id: todoDoc._id.toString(),
    title: todoDoc.title,
    isComplete: todoDoc.isComplete,
    createdAt: todoDoc.createdAt?.toISOString(),
  };
}

export default async function Tasks() {
  await connectDB();

  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const rawTodos = await TodoList.find({ userId: user?._id }).sort({
    createdAt: -1,
  });

  const todoLists = rawTodos.map(transformTodo);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-bold">Tasks</h1>

        <p className="text-zinc-400 mt-2">Manage your todo lists and tasks</p>
      </div>

      <section className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-sm">
        <CreateTodoListForm />
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-medium">Recent Todo Lists</h2>

          <span className="text-zinc-500 text-sm">
            {todoLists.length} Lists
          </span>
        </div>

        {todoLists.length === 0 ? (
          <div className=" p-12 border border-dashed border-zinc-800 rounded-2xl bg-zinc-900/30 text-center">
            <p className="text-zinc-500">No todo lists created yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {todoLists.map((list) => (
              <TodoListCard key={list._id} list={list} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
