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

      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white">
            Tasks
          </h1>

          <p className="mt-2 text-slate-400">
            Manage your todo lists and stay productive
          </p>
        </div>

        {/* Stats Card */}
        <div
          className="
            w-fit rounded-2xl
            border border-white/10
            bg-white/5
            px-5 py-4
            backdrop-blur-xl
          "
        >
          <p className="text-sm text-slate-400">
            Total Lists
          </p>

          <h2 className="mt-1 text-3xl font-bold text-white">
            {todoLists.length}
          </h2>
        </div>
      </div>

      {/* Create Form Section */}
      <section
        className="
          rounded-3xl
          border border-white/10
          bg-white/5
          p-6
          backdrop-blur-xl
        "
      >
        <div className="mb-5">
          <h2 className="text-xl font-semibold text-white">
            Create New Todo List
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Organize your tasks into separate lists
          </p>
        </div>

        <CreateTodoListForm />
      </section>

      {/* Lists Section */}
      <section className="space-y-6">

        <div className="flex items-center justify-between">

          <div>
            <h2 className="text-2xl font-semibold text-white">
              Recent Todo Lists
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Your recently created task collections
            </p>
          </div>

          <span
            className="
              rounded-full
              border border-white/10
              bg-white/5
              px-4 py-2
              text-sm text-slate-300
            "
          >
            {todoLists.length} Lists
          </span>
        </div>

        {/* Empty State */}
        {todoLists.length === 0 ? (
          <div
            className="
              rounded-3xl
              border border-dashed border-white/10
              bg-white/5
              p-16
              text-center
              backdrop-blur-xl
            "
          >
            <div
              className="
                mx-auto mb-5
                flex h-16 w-16
                items-center justify-center
                rounded-2xl
                bg-gradient-to-br
                from-indigo-500/20
                to-cyan-500/20
                text-2xl
              "
            >
              📝
            </div>

            <h3 className="text-xl font-semibold text-white">
              No todo lists yet
            </h3>

            <p className="mt-2 text-slate-400">
              Create your first todo list to start managing tasks.
            </p>
          </div>
        ) : (
          <div
            className="
              grid grid-cols-1
              gap-5
              sm:grid-cols-2
              xl:grid-cols-3
            "
          >
            {todoLists.map((list) => (
              <TodoListCard
                key={list._id}
                list={list}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
