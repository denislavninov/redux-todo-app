import React from 'react'
import "../css/TodoInput.css"
import "../css/TodoCreate.css"
import "../css/TodoCreateButton.css"
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { TodoType } from '../types/Types'
import { createTodo } from '../redux/todoSlice'

function TodoCreate() {
  const dispatch = useDispatch()
  const [newTodo, setNewTodo] = useState<string>("")

  const handleCreateTodo = () => {
    if (newTodo.trim().length === 0) {
      alert("Todo cannot be empty")
      return
    }

    const payload: TodoType = {
      id: Math.floor(Math.random() * 99999999),
      content: newTodo
    }
    dispatch(createTodo(payload))
    setNewTodo("")
  }

  return (
    <div className='todo-create'>
      <input
        value={newTodo}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTodo(e.target.value)}
        className='todo-input' type="text" placeholder='Create Todo...' />
      <button className='todo-create-button' onClick={handleCreateTodo}>Create</button>
    </div>
  )
}

export default TodoCreate