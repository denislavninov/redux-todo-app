import { useState } from 'react';
import "../css/TodoInput.css";
import "../css/TodoCreate.css";
import "../css/TodoCreateButton.css";
import { useDispatch } from 'react-redux';
import { TodoType } from '../types/Types';
import { createTodo } from '../redux/todoSlice';
import { CSSTransition } from 'react-transition-group';
import { addDoc } from 'firebase/firestore';
import { todosCollection } from '../firebase';
import { useAuth0 } from '@auth0/auth0-react';

function TodoCreate() {
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState<string>("");
  const [showInput, setShowInput] = useState<boolean>(false);
  const { user, isAuthenticated } = useAuth0();


  const handleCreateTodo = async () => {
    if (newTodo.trim().length === 0) {
      alert("Todo cannot be empty");
      return;
    }

    const payload: TodoType = {
      id: Math.floor(Math.random() * 99999999),
      content: newTodo
    };
    dispatch(createTodo(payload));

    if (isAuthenticated && user) {
      await addDoc(todosCollection, { ...payload, userId: user.sub });
    }

    setNewTodo("");
    setShowInput(false);
  };

  return (
    <div className='todo-create'>
      <button className='todo-create-button' onClick={() => setShowInput(!showInput)}>
        {showInput ? 'Cancel' : 'Create'}
      </button>

      <CSSTransition
        in={showInput}
        timeout={200}
        classNames="fade"
        unmountOnExit
      >
        <div className='submit-create-btn'>
          <input
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className='todo-input'
            type="text"
            placeholder='Create Todo...'
          />
          <button className='todo-create-button' onClick={handleCreateTodo}>
            Add
          </button>
        </div>
      </CSSTransition>
    </div>
  );
}

export default TodoCreate;