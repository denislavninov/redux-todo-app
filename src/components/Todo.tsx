import { useState } from 'react'
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import "../css/Todo.css"
import "../css/Icons.css"
import { TodoType } from '../types/Types';
import { useDispatch } from 'react-redux';
import { removeTodoById, updateTodo } from '../redux/todoSlice';
import { query, where, getDocs, deleteDoc, updateDoc } from 'firebase/firestore';
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
      const q = query(
        todosCollection,
        where("userId", "==", user?.sub),
        where("content", "==", content)
      );

      const querySnapshot = await getDocs(q);
      console.log('Found todos for deletion:', querySnapshot.size);

      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        console.log('Deleting document:', docRef.id);
        await deleteDoc(docRef);
        dispatch(removeTodoById(String(id)));
      } else {
        console.error('Todo not found for deletion:', { content, userId: user?.sub });
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleSaveTodo = async () => {
    try {
      const q = query(
        todosCollection,
        where("userId", "==", user?.sub),
        where("content", "==", content)
      );

      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        await updateDoc(docRef, {
          content: newTodo,
          updatedAt: new Date()
        });

        dispatch(updateTodo({
          id,
          firebaseId: String(id),
          content: newTodo,
          completed,
          userId: user?.sub || ''
        }));
        setEditable(false);
      }
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleToggleComplete = async () => {
    try {
      const q = query(
        todosCollection,
        where("userId", "==", user?.sub),
        where("content", "==", content)
      );

      const querySnapshot = await getDocs(q);
      console.log('Found todos:', querySnapshot.size);

      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        console.log('Updating document:', docRef.id);

        await updateDoc(docRef, {
          completed: !completed,
          updatedAt: new Date()
        });

        dispatch(updateTodo({
          id,
          firebaseId: String(id),
          content,
          completed: !completed,
          userId: user?.sub || ''
        }));
      } else {
        console.error('Todo not found:', { content, userId: user?.sub });
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