import React, { useState } from 'react'
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import "../css/Todo.css"
import "../css/Icons.css"
import { TodoType } from '../types/Types';
import { useDispatch } from 'react-redux';
import { removeTodoById, updateTodo } from '../redux/todoSlice';

interface TodoProps {
  todoProps: TodoType
}

function Todo({ todoProps }: TodoProps) {
  const { id, content } = todoProps;
  const dispatch = useDispatch();
  const [editable, setEditable] = useState<boolean>(false);
  const [newTodo, setNewTodo] = useState<string>(content)

  const handleRemoveTodo = () => {
    dispatch(removeTodoById(id))
  }
  const handleSaveTodo = () => {
    const payload = {
      id,
      content: newTodo
    }
    dispatch(updateTodo(payload))
    setEditable(false)
  }

  return (
    <div className='todo'>
      <div>
        {editable ? <input type='text' className="todo-input" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTodo(e.target.value)} /> : <div>{content}</div>}
      </div>
      <div>
        <IoIosRemoveCircleOutline className='icons' onClick={handleRemoveTodo} />
        {editable ? <FaCheck className='icons' onClick={handleSaveTodo} /> : <FaRegEdit className="icons" onClick={() => setEditable(true)} />}
      </div>
    </div>

  )
}


export default Todo