"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
    <div className="bg-[#171717] border border-zinc-800 rounded-2xl p-5 hover:border-zinc-700 transition-all duration-200">
      <Link href={`/tasks/${list._id}`} className="block">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-white truncate">
              {list.title}
            </h3>
            <p className="text-sm text-zinc-500 mt-1">
              Manage tasks inside this list
            </p>
          </div>

        </div>
      </Link>
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-zinc-800">
        {error ? (
          <p className="text-sm text-red-400">{error}</p>
        ) : (
          <span className="text-xs text-zinc-500">Click to open lists</span>
        )}

        <button
          onClick={() => deleteTodoList(list._id)}
          disabled={deleting}
          className="px-4 py-2 rounded-xl text-sm font-medium bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 hover:border-red-500/40 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {deleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}

