
import './App.css'
import TodoCreate from './components/TodoCreate'
import TodoList from './components/TodoList'
import Auth from './components/Auth'
function App() {
  return (
    <div>
      <Auth />
      <TodoCreate />
      <TodoList />
    </div>
  )
}

export default App
