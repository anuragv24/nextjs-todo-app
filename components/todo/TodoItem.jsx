"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { Pencil, Save, Trash2 } from "lucide-react";

const statusStyle = {
  pending: {
    container: "bg-zinc-500/10 border-zinc-500/20 text-zinc-300",
    dot: "bg-zinc-400",
  },

  "in-progress": {
    container: "bg-yellow-500/10 border-yellow-500/20 text-yellow-400",
    dot: "bg-yellow-400",
  },

  completed: {
    container: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
    dot: "bg-emerald-400",
  },
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
      className="
      group
      rounded-3xl
      border border-white/10
      bg-black/20
      p-4
      backdrop-blur-xl

      transition-all duration-300

      hover:border-indigo-500/20
      hover:shadow-xl hover:shadow-black/20
    "
    >
      <div className="space-y-4">
        {/* Top Row */}
        <div className="flex items-start gap-3">
          {/* Task Input Container */}
          <div
            className="
            flex-1
            rounded-2xl
            border border-white/10
            bg-white/5
            px-4 py-3
          "
          >
            <input
              type="text"
              readOnly={!isEditable}
              value={text}
              onChange={(e) => setText(e.target.value)}
              className={`
              w-full
              bg-transparent
              text-[15px]
              leading-relaxed
              outline-none
              transition-all duration-200

              ${
                status === "completed"
                  ? "text-slate-500 line-through opacity-70"
                  : "text-white"
              }

              ${isEditable ? "border-b border-indigo-500/30 pb-1" : ""}
            `}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Edit */}
            <button
              disabled={loading}
              onClick={() => {
                if (isEditable) {
                  updateTodo();
                } else {
                  setEditable(true);
                }
              }}
              className="
              flex items-center gap-2
              rounded-2xl
              border border-white/10
              bg-white/5
              px-4 py-3
              text-sm font-medium text-white

              transition-all duration-200

              hover:bg-white/10

              disabled:cursor-not-allowed
              disabled:opacity-50
            "
            >
              {isEditable ? <Save size={16} /> : <Pencil size={16} />}

              <span className="hidden sm:block">
                {loading && isEditable
                  ? "Saving..."
                  : isEditable
                    ? "Save"
                    : "Edit"}
              </span>
            </button>

            {/* Delete */}
            <button
              disabled={loading}
              onClick={() => deleteTodo()}
              className="
              flex items-center gap-2
              rounded-2xl
              border border-red-500/20
              bg-red-500/10
              px-4 py-3
              text-sm font-medium text-red-400

              transition-all duration-200

              hover:bg-red-500/20
              hover:border-red-500/40

              disabled:cursor-not-allowed
              disabled:opacity-50
            "
            >
              <Trash2 size={16} />

              <span className="hidden sm:block">
                {loading && !isEditable ? "Deleting..." : "Delete"}
              </span>
            </button>
          </div>
        </div>

        {/* Status Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {["pending", "in-progress", "completed"].map((item) => {
            const active = status === item;

            return (
              <button
                key={item}
                disabled={loading}
                onClick={() => updateStatus(item)}
                className={`
                flex items-center gap-2
                rounded-full
                border
                px-4 py-2
                text-sm font-medium
                transition-all duration-200

                ${
                  active
                    ? statusStyle[item].container
                    : "border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                }
              `}
              >
                <span
                  className={`
                  h-2.5 w-2.5 rounded-full
                  ${active ? statusStyle[item].dot : "bg-slate-500"}
                `}
                />

                {item === "in-progress"
                  ? "In Progress"
                  : item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            );
          })}
        </div>

        {/* Error */}
        {error && (
          <div
            className="
            rounded-2xl
            border border-red-500/20
            bg-red-500/10
            px-4 py-3
            text-sm text-red-400
          "
          >
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
