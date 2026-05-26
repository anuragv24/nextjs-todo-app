"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const statusStyle = {
  pending: "bg-zinc-700/30 text-zinc-300 border-zinc-700",

  "in-progress": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  completed: "bg-green-500/20 text-green-400 border-green-500/30",
};

const TodoItem = ({ todo }) => {
  const [isEditable, setEditable] = useState(false);
  const [text, setText] = useState(todo.text);
  const [status, setStatus] = useState(todo.status);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const updateStatus = async (newStatus) => {
    try {
      setLoading(true);
      setError("");

      setStatus(newStatus);

      const res = await fetch(`/api/todos/${todo._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message || "Failed to update status");
        setStatus(todo.status);
        return;
      }
      router.refresh();
    } catch (error) {
      setError("Something went wrong while updating status");
      setStatus(todo.status);
    } finally {
      setLoading(false);
    }
  };

  const updateTodo = async () => {
    if (!text.trim()) {
      setError("Task text cannot be empty");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await fetch(`/api/todos/${todo._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message || "Failed to update task");
        return;
      }

      setEditable(false);
      router.refresh();
    } catch (error) {
      setError("Something went wrong while updating task");
    } finally {
      setLoading(false);
    }
  };

  const deleteTodo = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(`/api/todos/${todo._id}`, { method: "DELETE" });

      const data = await res.json();

      if (!data.success) {
        setError(data.message || "Failed to delete task");
        return;
      }
      router.refresh();
    } catch (error) {
      setError("Something went wrong while deleting task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="bg-[#171717]
        border border-zinc-800
        rounded-2xl
        p-5
        space-y-5
        hover:border-zinc-700
        transition-all duration-200"
    >
      <div className="space-y-3">
        <input
          type="text"
          readOnly={!isEditable}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className={`
            w-full
            bg-transparent
            text-base
            outline-none
            transition-all duration-200

            ${
              status === "completed"
                ? "line-through opacity-60 text-zinc-500"
                : "text-zinc-100"
            }

            ${isEditable ? "border-b border-zinc-700 pb-1" : ""}
          `}
        />
        <div>
          <select
            value={status}
            disabled={loading}
            onChange={(e) => updateStatus(e.target.value)}
            className={`
              px-4 py-2
              rounded-xl
              border
              text-sm
              outline-none
              transition
              ${statusStyle[status]}
            `}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <div
        className="flex items-center justify-end
          gap-3
          pt-4
          border-t border-zinc-800
        "
      >
        <button
          disabled={loading}
          onClick={() => {
            if (isEditable) {
              updateTodo();
            } else {
              setEditable(true);
            }
          }}
          className=" px-4 py-2
            rounded-xl

            bg-zinc-800
            hover:bg-zinc-700

            text-sm font-medium

            transition-all duration-200

            disabled:opacity-50
            disabled:cursor-not-allowed"
        >
          {loading && isEditable ? "Saving..." : isEditable ? "Save" : "Edit"}
        </button>

        <button
          disabled={loading}
          onClick={() => deleteTodo()}
          className="px-4 py-2
            rounded-xl

            bg-red-500/10
            text-red-400

            border border-red-500/20

            hover:bg-red-500/20
            hover:border-red-500/40

            text-sm font-medium

            transition-all duration-200

            disabled:opacity-50
            disabled:cursor-not-allowed"
        >
          {loading && !isEditable ? "Deleting..." : "Delete"}
        </button>
      </div>
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rouded-xl px-4 py-3">
          {error}
        </div>
      )}
    </div>
  );
};

export default TodoItem;
