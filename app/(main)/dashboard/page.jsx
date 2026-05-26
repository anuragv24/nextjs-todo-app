import StatsCard from "@/components/ui/StatsCard";
import connectDB from "@/lib/db";
import getCurrentUser from "@/lib/getCurrentUser";
import Todo from "@/models/Todo";
import TodoList from "@/models/TodoList";

import { redirect } from "next/navigation";

export default async function Dashboard() {
  await connectDB();

  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const todoLists = await TodoList.find({
    userId: user._id,
  })
    .sort({ createdAt: -1 })
    .lean();

  const todos = await Todo.find({
    userId: user._id,
  })
    .sort({ createdAt: -1 })
    .lean();

  const stats = {
    totalTasks: todos.length,
    completedTasks: todos.filter((todo) => todo.status === "completed").length,

    inProgressTasks: todos.filter((todo) => todo.status === "in-progress")
      .length,

    pendingTasks: todos.filter((todo) => todo.status === "pending").length,

    totalLists: todoLists.length,
  };

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-bold">Dashboard</h1>

        <p className="text-zinc-400 mt-2">
          Overview of your tasks and productivity
        </p>
      </div>

      <section
        className="
          flex flex-col gap-2
          border-b border-zinc-800
          pb-6
        "
      >
        <h2 className="text-3xl font-semibold">Welcome, {user?.name}</h2>

        <p className="text-zinc-400">Manage your todo lists and tasks</p>
      </section>

      <section
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-5
          gap-6
        "
      >
        <StatsCard title="Total Tasks" value={stats.totalTasks} />

        <StatsCard title="Completed" value={stats.completedTasks} />

        <StatsCard title="In Progress" value={stats.inProgressTasks} />

        <StatsCard title="Pending" value={stats.pendingTasks} />

        <StatsCard title="Total Lists" value={stats.totalLists} />
      </section>

      <section
        className="
          grid
          grid-cols-1
          xl:grid-cols-2
          gap-6
        "
      >
        <div
          className="
            bg-[#171717]
            border border-zinc-800
            rounded-2xl
            p-6
          "
        >
          <div
            className="
              flex items-center justify-between
              mb-5
            "
          >
            <h2 className="text-2xl font-semibold">Recent Todo Lists</h2>
          </div>

          <div className="space-y-4">
            {todoLists.length === 0 ? (
              <div
                className="
                    border border-dashed border-zinc-800
                    rounded-xl
                    p-8
                    text-center
                  "
              >
                <p className="text-zinc-500">No todo lists found.</p>
              </div>
            ) : (
              todoLists.slice(0, 5).map((list) => (
                <div
                  key={list._id.toString()}
                  className="
                      bg-[#111111]
                      border border-zinc-800
                      rounded-xl
                      p-4
                      hover:border-zinc-700
                      transition-all duration-200
                    "
                >
                  <h3 className="font-medium text-zinc-100">{list.title}</h3>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
