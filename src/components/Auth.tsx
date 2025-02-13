import { useAuth0 } from "@auth0/auth0-react";
import { User } from "../types/Types";
import '../css/auth-container.css';
import { FaMoon } from "react-icons/fa";
import { CiLight } from "react-icons/ci";
import { useState } from "react";



const Auth = () => {
  const { user, isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0();
  const [theme, setTheme] = useState(false);
  if (isLoading) {
    return <div>Loading ...</div>;
  }



  const changeTheme = () => {
    const root: HTMLElement | null = document.getElementById('root');
    if (root) {
      root.classList.toggle('dark-mode');
      root.style.backgroundColor = theme ? 'white' : 'black';
      root.style.color = theme ? 'black' : 'white';
      setTheme(!theme);
    }
  }

  return (
    <div className="auth-container">
      <div className="theme-toggle">
        {!theme ? <FaMoon className="icon" onClick={changeTheme} /> : <CiLight className="icon" onClick={changeTheme} />}
        <span className="theme-toggle-text">{theme ? 'Dark Mode' : 'Light Mode'}</span>
      </div>
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


            <button className="auth-button" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
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