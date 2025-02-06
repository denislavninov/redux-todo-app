import { useAuth0 } from "@auth0/auth0-react";

const AuthLogout = () => {
  const { logout, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <button className="todo-create-button" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
        Log Out
      </button>
    )
  );
};

export default AuthLogout;