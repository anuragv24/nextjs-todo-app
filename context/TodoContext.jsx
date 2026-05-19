"use client"

import { createContext, useContext, useEffect, useState } from "react";

const todosDummy = [
  {id: 1,
    text: "task  1",
    isCompleted: false,
  },
  {id: 2,
    text: "task  2",
    isCompleted: true,
  },
  {id: 3,
    text: "task  3",
    isCompleted: false,
  },
]

const TodoContext = createContext()

export const TodoProvider = ({children}) => {
    const [Todos, setTodos] = useState([])

    const addTodo = (text) => {
        const newTodo = {
            id: crypto.randomUUID(),
            text,
            isCompleted: false,
        }
        setTodos((prev) => [...prev, newTodo])
       
    }

    const deleteTodo = (todoId) => {
        setTodos((prev) => 
        prev.filter((todo) => todo.id !== todoId))        
    }

    const updateTodo = (text, todoId) => {
        setTodos((prev) => 
            prev.map((todo) => 
                todo.id === todoId ? {...todo, text} : todo))
    }

    const toggleComplete = (todoId) => {
        setTodos((prev) => 
            prev.map((todo) => 
                todo.id === todoId 
                ? {
                    ...todo,
                    isCompleted: !todo.isCompleted
                } : todo
            )
        )
    }

    useEffect(() => {
        const storedTodos = localStorage.getItem("todos");
        if(storedTodos){
            setTodos(JSON.parse(storedTodos))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem(
            "todos",
            JSON.stringify(Todos)
        )
    }, [Todos])

    const value = {
        Todos,
        addTodo,
        deleteTodo,
        updateTodo,
        toggleComplete
    }

    return (
        <TodoContext.Provider value={value} >
            {children}
        </TodoContext.Provider>
    )
}

export const useTodo = () => useContext(TodoContext)