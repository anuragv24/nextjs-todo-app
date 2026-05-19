"use client"

import { useTodo } from '@/context/TodoContext'

const TodoStats = () => {
    const {Todos} = useTodo()
    const totalTodos = Todos.length
    const completedTodos = Todos.filter(t => t.isCompleted).length
  return (
    <div className='w-full flex justify-evenly items-center'>
        <h2 className='border rounded px-4 py-1'>Total Todos : {totalTodos}</h2>
        <h2 className='border rounded px-4 py-1' >Completed Todos : {completedTodos}</h2>
    </div>
  )
}

export default TodoStats