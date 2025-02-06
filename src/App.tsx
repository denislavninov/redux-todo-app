
import './App.css'
import TodoCreate from './components/TodoCreate'
import TodoList from './components/TodoList'
import AuthLogin from './components/AuthLogin'
import AuthProfile from './components/AuthProfile'
import AuthLogout from './components/AuthLogout'

function App() {
  return (
    <div >
      <div className="flex-container">
        <AuthLogin />
        <AuthProfile />
        <AuthLogout />
      </div>
      <TodoCreate />
      <TodoList />
    </div>
  )
}

export default App
