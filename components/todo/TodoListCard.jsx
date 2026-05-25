"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function TodoListCard({ list }) {
  const router = useRouter();

  const deleteTodoList = async (e, id) => {
    console.log("button clicked")
    e.preventDefault();
    e.stopPropagation();
    console.log("reached here !!")

    try {
      const res = await fetch(`/api/todolists`, { 
        method: "DELETE",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify({todoListId: id})
     });

     const data = await res.json();
     if(data.success){
        router.refresh();
     }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Link
      href={`/todos/${list._id}`}
      className="group flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 hover:bg-zinc-900/80 transition-all duration-200 shadow-sm"
    >
      <h3 className="text-base font-medium text-zinc-100 group-hover:text-white transition-colors duration-200 truncate pr-4">
        {list.title}
      </h3>
      <button
        onClick={(e) => deleteTodoList(e, list._id)}
        className="px-2.5 py-1 text-xs font-medium rounded text-zinc-400 hover:text-red-400 hover:bg-red-950/40 border border-transparent hover:border-red-950/50 transition duration-150 cursor-pointer"
      >
        Delete
      </button>
      <span className="text-zinc-500 group-hover:text-zinc-300 transform group-hover:translate-x-0.5 transition-all duration-200 text-sm flex-shrink-0">
        →
      </span>
    </Link>
  );
}
