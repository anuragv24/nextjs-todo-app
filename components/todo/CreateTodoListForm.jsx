"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import toast from "react-hot-toast";
import { Plus } from "lucide-react";

export default function CreateTodoListForm() {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("List title is required.");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch("/api/todolists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });

      if (!res.ok) {
        throw new Error("Failed request");
      }

      const data = await res.json();

      if (data.success) {
        setTitle("");
        toast.success("New Todo-List Created");
        router.push(`/tasks/${data.todoList?._id}`);
        
      }
      
      if (!data.success) {
        toast.error(data.message || "Failed to create list");
        return;
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
     <form
      onSubmit={handleSubmit}
      className="
        flex flex-col gap-4
        sm:flex-row
      "
    >

      <div className="flex-1">

        <input
          type="text"
          placeholder="Enter todo list title..."
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setError("");
          }}
          className="
            w-full
            rounded-2xl
            border border-white/10
            bg-slate-900/70
            px-4 py-3
            text-sm text-white
            placeholder:text-slate-500
            outline-none
            transition-all duration-200
            focus:border-indigo-500
            focus:ring-2 focus:ring-indigo-500/30
          "
        />

        {error && (
          <p className="mt-2 text-sm text-red-400">
            {error}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="
          group relative
          flex items-center justify-center gap-2
          overflow-hidden
          rounded-2xl
          bg-gradient-to-r
          from-indigo-500 to-cyan-500
          px-6 py-3
          text-sm font-semibold text-white
          shadow-lg
          transition-all duration-300
          hover:scale-[1.02]
          hover:shadow-cyan-500/20
          disabled:cursor-not-allowed
          disabled:opacity-70
        "
      >

        <Plus
          size={18}
          className="transition-transform duration-200 group-hover:rotate-90"
        />

        {loading ? "Creating..." : "Create List"}

        <div
          className="
            absolute inset-0
            translate-y-full
            bg-white/10
            transition-transform duration-300
            group-hover:translate-y-0
          "
        />
      </button>
    </form>
  );
}
