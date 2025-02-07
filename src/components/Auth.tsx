import { useAuth0 } from "@auth0/auth0-react";
import { User } from "../types/Types";

const Auth = () => {
  const { user, isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
            Log Out
          </button>
          <div>
            <img src={(user as User)?.picture} alt={(user as User)?.name} />
            <h2>{(user as User)?.name}</h2>
            <p>{(user as User)?.email}</p>
          </div>
        </div>
      ) : (
        <button onClick={() => loginWithRedirect()}>Log In</button>
      )}
    </div>
  );
};

export default Auth;