"use client"

import { useTodo } from '@/context/TodoContext'
import React from 'react'
import TodoItem from './TodoItem'

const TodoList = () => {
    const {Todos: todos, } = useTodo()

    if (!todos.length) {
        return (
            <p className="text-center text-zinc-500">
                No todos added yet.
            </p>
        );
    }

  return (
    <div className="max-h-[420px] overflow-y-auto pr-2">
        <ul className="space-y-2">
       {todos.map(
            (todo) => (
                    <li key={todo.id}>
                        <TodoItem todo={todo}/>
                    </li>
            )
        )}
    </ul>
    </div>
  
    )
    
  
}

export default TodoList