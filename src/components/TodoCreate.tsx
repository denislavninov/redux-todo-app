import React from 'react'
import "../css/TodoInput.css"
import "../css/TodoCreate.css"
import "../css/TodoCreateButton.css"
function TodoCreate() {
  return (
    <div className='todo-create'>
      <input className='todo-input' type="text" placeholder='Create Todo...' />
      <button className='todo-create-button' >Create</button>
    </div>
  )
}

export default TodoCreate