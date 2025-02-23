import { useState } from 'react'
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import "../css/Todo.css"
import "../css/Icons.css"
import { TodoType } from '../types/Types';
import { useDispatch } from 'react-redux';
import { removeTodoById, updateTodo } from '../redux/todoSlice';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { todosCollection } from '../firebase';
import { useAuth0 } from "@auth0/auth0-react";

interface TodoProps {
  todoProps: TodoType
}

function Todo({ todoProps }: TodoProps) {
  const { id, content, completed = false } = todoProps;
  const dispatch = useDispatch();
  const [editable, setEditable] = useState<boolean>(false);
  const [newTodo, setNewTodo] = useState<string>(content);
  const { user } = useAuth0();

  const handleRemoveTodo = async () => {
    try {
      // Delete from Firebase
      const todoRef = doc(todosCollection, String(id));
      await deleteDoc(todoRef);

      // Update Redux state
      dispatch(removeTodoById(Number(id)));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleSaveTodo = async () => {
    try {
      if (!user) return;

      const payload = {
        id,
        content: newTodo,
        userId: user.sub
      };

      // Update in Firebase
      const todoRef = doc(todosCollection, String(id));
      await updateDoc(todoRef, {
        content: newTodo,
        userId: user.sub
      });

      // Update Redux state
      dispatch(updateTodo(payload));
      setEditable(false);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleToggleComplete = async () => {
    try {
      const payload = {
        id,
        content,
        completed: !completed
      };

      // Update in Firebase
      const todoRef = doc(todosCollection, String(id));
      await updateDoc(todoRef, {
        completed: !completed
      });

      // Update Redux state
      dispatch(updateTodo(payload));
    } catch (error) {
      console.error('Error toggling todo completion:', error);
    }
  };

  return (
    <div className={`todo ${completed ? 'completed' : ''}`}>
      <div className='todo-text'>
        <input
          type="checkbox"
          checked={completed}
          onChange={handleToggleComplete}
          className="todo-checkbox"
        />
        {editable ? (
          <input
            type='text'
            className="todo-input"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
        ) : (
          <span style={{ textDecoration: completed ? 'line-through' : 'none' }}>
            {content}
          </span>
        )}
      </div>
      <div className='todo-icons'>
        <IoIosRemoveCircleOutline className='icons remove-icon' onClick={handleRemoveTodo} />
        {editable ? <FaCheck className='icons edit-icon' onClick={handleSaveTodo} /> : <FaRegEdit className="icons edit-icon" onClick={() => setEditable(true)} />}
      </div>
    </div>
  )
}

export default Todo