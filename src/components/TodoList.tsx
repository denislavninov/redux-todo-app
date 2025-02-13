import Todo from './Todo'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../redux/store'
import { TodoType } from '../types/Types'
import { useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from '../firebase';
import { setTodos } from '../redux/todoSlice';

const db = getFirestore(app);

function TodoList() {
  const dispatch = useDispatch();
  const { todos } = useSelector((state: RootState) => state.todo);

  useEffect(() => {
    const loadTodos = async () => {
      const todosCollection = collection(db, "todos");
      const todoSnapshot = await getDocs(todosCollection);
      const todoList = todoSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      dispatch(setTodos(todoList as TodoType[]));
    };

    loadTodos();
  }, [dispatch]);

  return (
    <div>
      {todos && todos.map((todo: TodoType) =>
        <Todo key={todo.id} todoProps={todo} />)}
    </div>
  )
}

export default TodoList