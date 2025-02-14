import Todo from './Todo'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../redux/store'
import { TodoType } from '../types/Types'
import { useEffect } from 'react';
import { getDocs } from 'firebase/firestore';
import { setTodos } from '../redux/todoSlice';
import { CSSTransition } from 'react-transition-group';
import { todosCollection } from '../firebase';

function TodoList() {
  const dispatch = useDispatch();
  const { todos } = useSelector((state: RootState) => state.todo);

  useEffect(() => {
    const loadTodos = async () => {
      const todoSnapshot = await getDocs(todosCollection);
      const todoList = todoSnapshot.docs.map(doc => (doc.data()));
      console.log('Remove me after test! Todos from DB:, ', todoList);

      dispatch(setTodos(todoList as TodoType[]));
    };

    loadTodos();
  }, [dispatch]);

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