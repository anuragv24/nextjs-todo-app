"use client";

import { useTodo } from "@/context/TodoContext";
import React, { useState } from "react";

const TodoItem = ({ todo }) => {
  const [isEditable, setEditable] = useState(false);
  const [text, setText] = useState(todo.text);

  const { deleteTodo, updateTodo, toggleComplete } = useTodo();

  return (
    <div className={`flex items-center gap-3 px-2 rounded-xl ${todo.isCompleted ? "bg-green-400/40" : ""}`}>
      <input 
        type="checkbox" 
        checked={todo.isCompleted}
        onChange={() => toggleComplete(todo.id)}
        className="cursor-pointer appearance-auto w-4 h-4 shrink-0"
      />
      <input
        type="text"
        readOnly={!isEditable || todo.isCompleted}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className={` flex-1 min-w-0  text-sm  ${todo.isCompleted ? "line-through opacity-60" : ""}`}
      />
      <div className="flex items-center gap-2 shrink-0">
        <button
        disabled={todo.isCompleted}
        onClick={() => {
          if (isEditable && text.trim()) {
            updateTodo(text, todo.id);
          }
          setEditable((prev) => !prev);
        }}
        className="px-3 py-2 text-sm"
      >
        {isEditable ? "Save" : "Edit"}
      </button>
      <button 
        onClick={() => deleteTodo(todo.id)}
        className="px-3 py-2 text-sm"
    >Delete</button>
      </div>
      
    </div>
  );
};

export default TodoItem;
