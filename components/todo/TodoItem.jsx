"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const TodoItem = ({ todo }) => {
  const [isEditable, setEditable] = useState(false);
  const [text, setText] = useState(todo.text);
  const router = useRouter()

  const handleToggle = async (id, currentStatus) => {
    try{
      const res = await fetch(`/api/todos/${id}`, {
        method: "PATCH",
        headers: {
           "Content-Type" : "application/json",
        },
        body: JSON.stringify({isCompleted: !currentStatus}),
      })
      const data = await res.json();
        if(data.success){
            router.refresh();
        }
    } catch(error) {
      console.log(error)
    }
  }
  const updateTodo = async (id, text) => {
    try{
      const res = await fetch(`/api/todos/${id}`, {
        method: "PATCH",
        headers: {
           "Content-Type" : "application/json",
        },
        body: JSON.stringify({text}),
      })

      const data = await res.json();

        if(data.success){
            router.refresh();
        }

    } catch(error) {
      console.log(error)
    }
  }

    const deleteTodo = async (id) => {
      try {
        const res = await fetch(`/api/todos/${id}`, 
          {method: "DELETE",}
        )

        const data = await res.json();
        if(data.success){
          router.refresh()
        }
      } catch (error) {
        console.log(error)
      }
    }

  return (
    <div className="group flex items-center gap-3 bg-zinc-900/60 border border-zinc-800/60 rounded-xl px-4 py-3 hover:border-zinc-700/80 transition-all duration-200">
      <input
        type="checkbox"
        checked={todo.isCompleted}
        onChange={() => handleToggle(todo._id, todo.isCompleted)}
        className="cursor-pointer h-4 w-4 rounded border-zinc-700 bg-zinc-800 text-zinc-100 focus:ring-zinc-700 accent-zinc-100 shrink-0"
      />
      <input
        type="text"
        readOnly={!isEditable || todo.isCompleted}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className={`flex-1 min-w-0 bg-transparent text-sm text-zinc-200 focus:text-white outline-none transition-all duration-200 ${
          todo.isCompleted ? "line-through opacity-60 " : ""
        } ${isEditable ? "border-b border-zinc-700 pb-0.5" : ""}`}
      />

      <div className="flex items-center gap-1 shrink-0">
        <button
          disabled={todo.isCompleted}
          onClick={() => {
            if (isEditable && text.trim()) {
              updateTodo(todo._id);
            }
            setEditable((prev) => !prev);
          }}
          className="px-2.5 py-1 text-xs font-medium rounded text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/80 border border-transparent hover-border-zinc-800 disabled:opacity-30 disabled:hover:bg-transparent transition duration-150 cursor-pointer"
        >
          {isEditable ? "Save" : "Edit"}
        </button>
        <button
          onClick={() => deleteTodo(todo._id)}
          className="px-2.5 py-1 text-xs font-medium rounded text-zinc-400 hover:text-red-400 hover:bg-red-950/40 border border-transparent hover:border-red-950/50 transition duration-150 cursor-pointer"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
