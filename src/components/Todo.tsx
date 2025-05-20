import { useState } from 'react'
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import "../css/Todo.css"
import "../css/Icons.css"
import { TodoType } from '../types/Types';
import { useDispatch } from 'react-redux';
import { removeTodoById, updateTodo } from '../redux/todoSlice';
import { deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { todosCollection } from '../firebase';

interface TodoProps {
  todoProps: TodoType
}

function Todo({ todoProps }: TodoProps) {
  const { content, completed = false } = todoProps;
  const dispatch = useDispatch();
  const [editable, setEditable] = useState<boolean>(false);
  const [newTodo, setNewTodo] = useState<string>(content);

  const handleRemoveTodo = async () => {
    dispatch(removeTodoById(todoProps.firebaseId));
    try {
      if (todoProps.firebaseId) {
        await deleteDoc(doc(todosCollection, todoProps.firebaseId));
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleSaveTodo = async () => {
    dispatch(updateTodo({
      ...todoProps,
      content: newTodo
    }));
    setEditable(false);
    try {
      if (todoProps.firebaseId) {
        await updateDoc(doc(todosCollection, todoProps.firebaseId), {
          content: newTodo,
          updatedAt: new Date()
        });
      }
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleToggleComplete = async () => {
    dispatch(updateTodo({
      ...todoProps,
      completed: !completed
    }));
    try {
      if (todoProps.firebaseId) {
        await updateDoc(doc(todosCollection, todoProps.firebaseId), {
          completed: !completed,
          updatedAt: new Date()
        });
      }
    } catch (error) {
      console.error('Error details:', error);
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