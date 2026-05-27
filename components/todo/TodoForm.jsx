"use client"

import { useState } from "react"
import {useRouter} from "next/navigation"
import toast from "react-hot-toast";
import { Plus } from "lucide-react";

const TodoForm = ({listId}) => {
    const [todo, setTodo] = useState("");

    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!todo.trim()) return

        try {
            const res = await fetch("/api/todos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    todo, todoListId: listId,
                })
            });

            if (!res.ok) {
        throw new Error("Request failed");
      }

            const data = await res.json();
            if(data.success){
                setTodo("");
                toast.success("Task added");
                router.refresh();
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong");
        }
    
    }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 sm:flex-row"
    >

      <input
        type="text"
        required
        placeholder="Add a new task..."
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        className="
          flex-1
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

      <button
        type="submit"
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
        "
      >

        <Plus
          size={18}
          className="
            transition-transform duration-200
            group-hover:rotate-90
          "
        />

        Add Task

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
  )
}

export default TodoForm