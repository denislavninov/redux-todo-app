import React from 'react'
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import "../css/Todo.css"
import "../css/Icons.css"



function Todo() {
  return (
    <div className='todo'>
      <div>
        I am Todo
      </div>
      <div>
        <IoIosRemoveCircleOutline className='icons' />
        <FaRegEdit className='icons' />
      </div>
    </div>

  )
}

export default Todo