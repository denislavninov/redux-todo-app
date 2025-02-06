import { useAuth0 } from "@auth0/auth0-react";
import { User } from "../types/Types";

const AuthProfile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div className="profile-info">
        <img src={(user as User)?.picture} alt={(user as User)?.name} />
        <h2>{(user as User)?.name}</h2>
        <p>{(user as User)?.email}</p>
      </div>
    )
  );
};

export default AuthProfile;