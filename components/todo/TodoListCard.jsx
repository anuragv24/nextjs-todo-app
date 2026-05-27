"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Trash2, ArrowRight } from "lucide-react";

export default function TodoListCard({ list }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const deleteTodoList = async (id) => {
    setDeleting(true);
    setError("");

    try {
      const res = await fetch(`/api/todolists`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ todoListId: id }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message || "Failed to delete todo list");
        return;
      }

      router.refresh();

    } catch (error) {

      setError("Something went wrong while deleting the list");

    } finally {
      setDeleting(false);
    }
  };

  return (
   <div
      className="
        group relative overflow-hidden
        rounded-3xl
        border border-white/10
        bg-white/5
        p-6
        backdrop-blur-xl
        transition-all duration-300
        hover:-translate-y-1
        hover:border-indigo-500/30
        hover:shadow-2xl hover:shadow-indigo-500/10
      "
    >

      {/* Hover Glow */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-br
          from-indigo-500/0
          to-cyan-500/0
          opacity-0
          transition-opacity duration-300
          group-hover:opacity-100
        "
      />

      <Link
        href={`/tasks/${list._id}`}
        className="relative z-10 block"
      >

        <div className="space-y-5">

          {/* Top */}
          <div className="flex items-start justify-between gap-4">

            <div>

              <h3 className="truncate text-xl font-semibold text-white">
                {list.title}
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                Manage tasks inside this list
              </p>
            </div>

            <div
              className="
                flex h-12 w-12
                items-center justify-center
                rounded-2xl
                bg-gradient-to-br
                from-indigo-500
                to-cyan-500
                shadow-lg
              "
            >
              <ArrowRight size={20} />
            </div>
          </div>

          {/* Meta */}
          <div
            className="
              flex items-center justify-between
              rounded-2xl
              border border-white/10
              bg-black/20
              px-4 py-3
            "
          >
            <span className="text-sm text-slate-400">
              Created
            </span>

            <span className="text-sm font-medium text-white">
              {new Date(list.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </Link>

      {/* Footer */}
      <div
        className="
          relative z-10
          mt-6
          flex items-center justify-between
          border-t border-white/10
          pt-4
        "
      >

        {error ? (
          <p className="text-sm text-red-400">
            {error}
          </p>
        ) : (
          <span className="text-sm text-slate-500">
            Click to open list
          </span>
        )}

        <button
          onClick={() => deleteTodoList(list._id)}
          disabled={deleting}
          className="
            flex items-center gap-2
            rounded-xl
            border border-red-500/20
            bg-red-500/10
            px-4 py-2
            text-sm font-medium text-red-400
            transition-all duration-200
            hover:bg-red-500/20
            hover:border-red-500/40
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >

          <Trash2 size={16} />

          {deleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}

