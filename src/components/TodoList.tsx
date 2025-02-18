import Todo from './Todo'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../redux/store'
import { TodoType } from '../types/Types'
import { useEffect } from 'react';
import { getDocs, query, where } from 'firebase/firestore';
import { setTodos } from '../redux/todoSlice';
import { CSSTransition } from 'react-transition-group';
import { todosCollection } from '../firebase';
import { useAuth0 } from '@auth0/auth0-react';

function TodoList() {
  const dispatch = useDispatch();
  const { todos } = useSelector((state: RootState) => state.todo);
  const { user, isAuthenticated } = useAuth0();


  useEffect(() => {
    const loadTodos = async () => {
      if (isAuthenticated && user) {
        const userId = user.sub;
        const userTodosQuery = query(todosCollection, where("userId", "==", userId));
        const todoSnapshot = await getDocs(userTodosQuery);
        const todoList = todoSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        console.log('Remove me after test! User Todos from DB:', todoList);

        dispatch(setTodos(todoList as TodoType[]));
      }
    };

    loadTodos();
  }, [dispatch, isAuthenticated, user]);

  return (
    <div className='todo-responsive'>
      {todos && todos.map((todo: TodoType) =>
        <CSSTransition key={todo.id} timeout={500} classNames="fade">
          <Todo key={todo.id} todoProps={todo} />
        </CSSTransition>
      )}
    </div>
  )
}

export default TodoList