import StatsCard from "@/components/ui/StatsCard";
import connectDB from "@/lib/db";
import getCurrentUser from "@/lib/getCurrentUser";
import Todo from "@/models/Todo";
import TodoList from "@/models/TodoList";

import { redirect } from "next/navigation";

import {
  ClipboardList,
  CheckCircle2,
  Loader2,
  Clock3,
  Layers3,
} from "lucide-react";

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

  const statCards = [
    {
      title: "Total Tasks",
      value: stats.totalTasks,
      icon: ClipboardList,
      color: "from-indigo-500 to-cyan-500",
    },
    {
      title: "Completed",
      value: stats.completedTasks,
      icon: CheckCircle2,
      color: "from-emerald-500 to-green-500",
    },
    {
      title: "In Progress",
      value: stats.inProgressTasks,
      icon: Loader2,
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "Pending",
      value: stats.pendingTasks,
      icon: Clock3,
      color: "from-zinc-500 to-zinc-700",
    },
    {
      title: "Total Lists",
      value: stats.totalLists,
      icon: Layers3,
      color: "from-pink-500 to-purple-500",
    },
  ];

  return (
    <div className="space-y-10">
      {/* Top Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white">
            Dashboard
          </h1>

          <p className="mt-2 text-slate-400">
            Overview of your productivity and tasks
          </p>
        </div>

        {/* Profile Card */}
        <div
          className="
            flex items-center gap-4
            rounded-3xl
            border border-white/10
            bg-white/5
            px-5 py-4
            backdrop-blur-xl
          "
        >
          <div
            className="
              flex h-14 w-14
              items-center justify-center
              rounded-2xl
              bg-gradient-to-br
              from-indigo-500
              to-cyan-500
              text-lg font-bold text-white
              shadow-lg
            "
          >
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <div>
            <p className="text-sm text-slate-400">Welcome back</p>

            <h2 className="text-lg font-semibold text-white">{user?.name}</h2>
          </div>
        </div>
      </div>

      {/* Stats */}
      <section
        className="
          grid
          grid-cols-1
          gap-6
          sm:grid-cols-2
          xl:grid-cols-5
        "
      >
        {statCards.map((item) => (
          <StatsCard
            key={item.title}
            title={item.title}
            value={item.value}
            icon={item.icon}
            color={item.color}
          />
        ))}
      </section>

      {/* Bottom Grid */}
      <section
        className="
          grid
          grid-cols-1
          gap-6
          xl:grid-cols-2
        "
      >
        {/* Recent Lists */}
        <div
          className="
            rounded-3xl
            border border-white/10
            bg-white/5
            p-6
            backdrop-blur-xl
          "
        >
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white">
                Recent Todo Lists
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Your latest created lists
              </p>
            </div>

            <div
              className="
                rounded-full
                border border-white/10
                bg-white/5
                px-4 py-2
                text-sm text-slate-300
              "
            >
              {todoLists.length} Lists
            </div>
          </div>

          <div className="space-y-4">
            {todoLists.length === 0 ? (
              <div
                className="
                  rounded-2xl
                  border border-dashed border-white/10
                  bg-black/10
                  p-10
                  text-center
                "
              >
                <p className="text-slate-400">No todo lists found.</p>
              </div>
            ) : (
              todoLists.slice(0, 5).map((list, index) => (
                <div
                  key={list._id.toString()}
                  className="
                    group
                    flex items-center justify-between
                    rounded-2xl
                    border border-white/10
                    bg-black/10
                    p-4

                    transition-all duration-300

                    hover:border-indigo-500/20
                    hover:bg-white/[0.07]
                  "
                >
                  <div className="flex items-center gap-4">
                    {/* List Icon */}
                    <div
                      className="
                        flex h-12 w-12
                        items-center justify-center
                        rounded-2xl
                        bg-gradient-to-br
                        from-indigo-500
                        to-cyan-500
                        text-white
                        shadow-lg
                      "
                    >
                      <ClipboardList size={20} />
                    </div>

                    <div>
                      <h3 className="font-medium text-white">{list.title}</h3>

                      <p className="mt-1 text-sm text-slate-400">
                        Todo List #{index + 1}
                      </p>
                    </div>
                  </div>

                  {/* Date */}
                  <span className="text-sm text-slate-500">
                    {new Date(list.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Productivity Card */}
        <div
          className="
            rounded-3xl
            border border-white/10
            bg-white/5
            p-6
            backdrop-blur-xl
          "
        >
          <h2 className="text-2xl font-semibold text-white">
            Productivity Insights
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Quick summary of your progress
          </p>

          <div className="mt-8 space-y-6">
            {/* Progress Bar */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-slate-400">Completion Rate</span>

                <span className="text-sm text-white">
                  {stats.totalTasks === 0
                    ? 0
                    : Math.round(
                        (stats.completedTasks / stats.totalTasks) * 100,
                      )}
                  %
                </span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-black/20">
                <div
                  className="
                    h-full
                    rounded-full
                    bg-gradient-to-r
                    from-emerald-500
                    to-green-400
                  "
                  style={{
                    width: `${
                      stats.totalTasks === 0
                        ? 0
                        : Math.round(
                            (stats.completedTasks / stats.totalTasks) * 100,
                          )
                    }%`,
                  }}
                />
              </div>
            </div>

            {/* Insights */}
            <div className="space-y-4">
              <div
                className="
                  flex items-center justify-between
                  rounded-2xl
                  border border-white/10
                  bg-black/10
                  px-4 py-3
                "
              >
                <span className="text-slate-400">Completed Tasks</span>

                <span className="font-semibold text-emerald-400">
                  {stats.completedTasks}
                </span>
              </div>

              <div
                className="
                  flex items-center justify-between
                  rounded-2xl
                  border border-white/10
                  bg-black/10
                  px-4 py-3
                "
              >
                <span className="text-slate-400">Pending Tasks</span>

                <span className="font-semibold text-yellow-400">
                  {stats.pendingTasks}
                </span>
              </div>

              <div
                className="
                  flex items-center justify-between
                  rounded-2xl
                  border border-white/10
                  bg-black/10
                  px-4 py-3
                "
              >
                <span className="text-slate-400">Active Lists</span>

                <span className="font-semibold text-cyan-400">
                  {stats.totalLists}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
