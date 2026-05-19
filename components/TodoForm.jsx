"use client"

import { useTodo } from "@/context/TodoContext";
import { useState } from "react"


const TodoForm = () => {
    const [todo, setTodo] = useState("");

    const {addTodo} = useTodo()

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!todo.trim()) return

        addTodo(todo)
        setTodo("")
    
    }

  return (
    <div className="flex justify-center items-center ">
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                required
                placeholder="Enter your task.."
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
            />
            <button type="submit" >Add</button>
        </form>
    </div>
  )
}

export default TodoForm