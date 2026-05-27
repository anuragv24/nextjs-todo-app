import connectDB from "@/lib/db";

import TodoList from "@/models/TodoList";
import Todo from "@/models/Todo";

import TodoStats from "@/components/todo/TodoStats";
import TodoForm from "@/components/todo/TodoForm";
import TodoListComponent from "@/components/todo/TodoListComponent";

import Link from "next/link";
import getCurrentUser from "@/lib/getCurrentUser";

import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default async function TodoPage({ params }) {
  await connectDB();

  const { listId } = await params;

  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const todoListDoc = await TodoList.findById(listId).lean();

  if (!todoListDoc) {
    return (
      <div
        className="
          rounded-3xl
          border border-dashed border-white/10
          bg-white/5
          p-16
          text-center
          text-slate-400
          backdrop-blur-xl
        "
      >
        List not found
      </div>
    );
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
      {/* Header */}
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <Link
            href="/tasks"
            className="
              inline-flex items-center gap-2
              text-sm font-medium text-slate-400
              transition hover:text-white
            "
          >
            <ArrowLeft size={18} />
            Back to Tasks
          </Link>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white">
            {todoList.title}
          </h1>

          <p className="mt-2 text-slate-400">Manage tasks inside this list</p>
        </div>

        {/* Mini Badge */}
        <div
          className="
            w-fit rounded-2xl
            border border-white/10
            bg-white/5
            px-5 py-4
            backdrop-blur-xl
          "
        >
          <p className="text-sm text-slate-400">Total Tasks</p>

          <h2 className="mt-1 text-3xl font-bold text-white">{todos.length}</h2>
        </div>
      </div>

      {/* Stats */}
      <section
        className="
          rounded-3xl
          border border-white/10
          bg-white/5
          p-6
          backdrop-blur-xl
        "
      >
        <TodoStats todos={todos} />
      </section>

      {/* Form */}
      <section
        className="
          rounded-3xl
          border border-white/10
          bg-white/5
          p-6
          backdrop-blur-xl
        "
      >
        <TodoForm listId={listId} />
      </section>

      {/* Tasks */}
      <section
        className="
          rounded-3xl
          border border-white/10
          bg-white/5
          p-6
          backdrop-blur-xl
        "
      >
        <TodoListComponent todos={todos} />
      </section>
    </div>
  );
}
