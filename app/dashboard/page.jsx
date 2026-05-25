import CreateTodoListForm from "@/components/todo/CreateTodoListForm";
import LogoutButton from "@/components/todo/LogoutButton";
import TodoListCard from "@/components/todo/TodoListCard";
import connectDB from "@/lib/db";
import getCurrentUser from "@/lib/getCurrentUser";
import TodoList from "@/models/TodoList";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  await connectDB();

  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const todoLists = await TodoList.find({ userId: user?._id }).sort({
    createdAt: -1,
  });

  return (
    <div className="min-h-screen bg-zinc-950  text-zinc-50 flex justify-center items-center antialiased">
      <main className="max-w-5xl mx-auto p-6 md:p-12 flex flex-col gap-12 border border-zinc-900">
        <div className="flex items-center justify-end text-sm border-b border-zinc-800/60 pb-4">
          <LogoutButton />
        </div>

        <section className="flex flex-col gap-2 border-b border-zinc-800 pb-6 text-center ">
          <h1 className="text-3xl font-semibold">Welcome, {user?.name}</h1>
          <p className="text-zinc-400 mt-2">Manage your todo lists</p>
        </section>

        <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-sm">
          <CreateTodoListForm />
        </section>

        <section className="flex flex-col gap-6">
          <h2 className="text-xl font-medium text-zinc-200 mb-4">
            Recent Todo Lists
          </h2>

          {todoLists.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 border border-dashed border-zinc-800 rounded-xl bg-zinc-900/30">
              <p className="text-sm text-zinc-500">
                No todo lists created yet.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {todoLists.map((list) => (
                <TodoListCard key={list._id.toString()} list={list} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
