import { useAuth0 } from "@auth0/auth0-react";
import { User } from "../types/Types";
import '../css/auth-container.css';
import { useState } from "react";
import { FaToggleOff } from "react-icons/fa6";
import { FaToggleOn } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";




const Auth = () => {
  const { user, isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0();
  const { todos } = useSelector((state: RootState) => state.todo);
  const [theme, setTheme] = useState(false);
  const completedTodos = todos.filter((todo) => todo.completed).length;
  if (isLoading) {
    return <div>Loading ...</div>;
  }



  const changeTheme = () => {
    const body = document.body;
    body.classList.toggle('dark-mode');
    setTheme(!theme);
  }

  return (
    <div className="auth-container">
      <div className="task-count-container">
        <p className="task-count">
          {completedTodos} of {todos.length} tasks completed
        </p>
      </div>

      <div className="theme-toggle">
        {!theme ? <FaToggleOff className="icon" onClick={changeTheme} /> : <FaToggleOn className="icon" onClick={changeTheme} />}
        <span className="theme-toggle-text">{theme ? 'Dark Mode' : 'Light Mode'}</span>
      </div>
      <p className="app-description">Organize your tasks efficiently</p>
      <h1 className="app-title">Todo App</h1>



      {!isAuthenticated && (
        <div className="auth-info">
          <p className="login-message">
            <span className="highlight">✨ Log in to save your todos</span>
            <br />
            <small>Your tasks will be synced across all your devices</small>
          </p>
        </div>
      )}



      <div className="auth-buttons">
        {isAuthenticated ? (
          <>

            <div className="user-info">

              <img src={(user as User)?.picture} alt={(user as User)?.name} className="user-image" />
              <div className="user-details">
                <h2 className="user-name">{(user as User)?.name}</h2>
                <p className="user-email">{(user as User)?.email}</p>
              </div>
            </div>


            <button className="auth-button logged-in" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
              Log Out
            </button>

          </>
        ) : (
          <button className="auth-button" onClick={() => loginWithRedirect()}>
            Log In
          </button>
        )}
      </div>

    </div>
  );
};

export default Auth;