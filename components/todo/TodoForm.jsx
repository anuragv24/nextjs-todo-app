"use client"

import { useState } from "react"
import {useRouter} from "next/navigation"
import toast from "react-hot-toast";

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
        }
    
    }

  return (
    <div className="w-full">
        <form onSubmit={handleSubmit} className="flex gap-2 w-full">
            <input 
                type="text"
                required
                placeholder="Add a new task.."
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                className="flex-1   bg-zinc-900 text-zinc-100 placeholder-zinc-500 text-sm rounded-lg border border-zinc-800 px-4 py-2 outline-none transition duration-200 focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700"
            />
            <button 
                type="submit"
                className="bg-zinc-100 text-zinc-950 hover:bg-zinc-200 text-sm font-medium px-4 py-2 rounded-lg transition duration-200  cursor-pointer active:scale-[0.98] shrink-0"
            >Add</button>
        </form>
    </div>
  )
}

export default TodoForm