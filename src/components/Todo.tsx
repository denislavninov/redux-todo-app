import { useState } from 'react'
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import "../css/Todo.css"
import "../css/Icons.css"
import { TodoType } from '../types/Types';
import { useDispatch } from 'react-redux';
import { removeTodoById, updateTodo } from '../redux/todoSlice';
import { deleteDoc, updateDoc, query, where, getDocs } from 'firebase/firestore';
import { todosCollection } from '../firebase';

interface TodoProps {
  todoProps: TodoType
}

function Todo({ todoProps }: TodoProps) {
  const { id, content, completed = false } = todoProps;
  const dispatch = useDispatch();
  const [editable, setEditable] = useState<boolean>(false);
  const [newTodo, setNewTodo] = useState<string>(content);

  const handleRemoveTodo = async () => {
    try {
      // First query to find the document
      const q = query(todosCollection, where("content", "==", content));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        await deleteDoc(docRef);
        dispatch(removeTodoById(id));
      } else {
        console.error('Todo document not found');
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleSaveTodo = async () => {
    try {
      // First query to find the document
      const q = query(todosCollection, where("content", "==", content));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        await updateDoc(docRef, {
          content: newTodo
        });

        const payload = {
          id,
          content: newTodo,
          completed
        };
        dispatch(updateTodo(payload));
        setEditable(false);
      } else {
        console.error('Todo document not found');
      }
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleToggleComplete = async () => {
    try {
      // First query to find the document
      const q = query(todosCollection, where("content", "==", content));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        await updateDoc(docRef, {
          completed: !completed
        });

        const payload = {
          id,
          content,
          completed: !completed
        };
        dispatch(updateTodo(payload));
      } else {
        console.error('Todo document not found');
      }
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