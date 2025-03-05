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
      try {
        if (isAuthenticated && user) {
          const userTodosQuery = query(
            todosCollection,
            where("userId", "==", user.sub)
          );

          const todoSnapshot = await getDocs(userTodosQuery);
          const todoList = todoSnapshot.docs.map(doc => {
            const data = doc.data();
            const updatedAt = data.updatedAt ? data.updatedAt.toDate().toISOString() : null;

            return {
              ...data,
              firebaseId: doc.id,
              updatedAt
            };
          });

          console.log('Loaded todos:', todoList);
          dispatch(setTodos(todoList as TodoType[]));
        }
      } catch (error) {
        console.error("Error loading todos:", error);
      }
    };

    loadTodos();
  }, [dispatch, isAuthenticated, user]);

  return (
    <div className='todo-responsive'>
      {todos && todos.map((todo: TodoType, index: number) =>
        <CSSTransition key={todo.firebaseId || index} timeout={500} classNames="fade">
          <Todo todoProps={todo} />
        </CSSTransition>
      )}
    </div>
  )
}

export default TodoList