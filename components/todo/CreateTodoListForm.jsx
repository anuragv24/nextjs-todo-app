"use client"

import { useRouter } from "next/navigation";
import { useState } from "react"

export default function CreateTodoListForm(){
    const [title, setTitle] = useState("")
    const [loading, setLoading] = useState(false);

    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!title.trim())
            return;

        try {
            setLoading(true);
            const res = await fetch("/api/todolists", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({title}),
            })

            const data = await res.json();
            console.log("todolist data :: ", data)
            if(data.success){
                setTitle("");
                router.push(`/todos/${data.todoList?._id}`)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit}
        className="flex flex-col gap-3 w-full">
            <input 
                type="text"
                placeholder="Create new todo list..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="flex-1 bg-zinc-950 text-zinc-100 placeholder-zinc-500 text-sm rounded-lg border border-zinc-800 px-4 py-2.5 outline-none transition colors duration-200 focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700 disabled:opacity-50" 
            />

            <button
                type="submit"
                disabled={loading}
                className="bg-zinc-100 text-zinc-950 hover:bg-zinc-200 text-sm font-medium px-5 py-2.5 rounded-lg transition-all duration-200 active:scale-[0.98] disabled:opacity-40 disabled:hover:bg-zinc-100 disabled:active:scale-100 flex items-center justify-center min-w-[90px]"
            >
                {loading ? (
                    <span className="flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-950 border-t-transparent" />
                        Creating
                    </span>
                ) : (
                    "Create"
                )}
            </button>

        </form>
    )
}