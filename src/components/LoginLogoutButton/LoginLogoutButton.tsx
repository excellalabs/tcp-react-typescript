import {
  useAuthDispatch,
  useAuthState,
} from "../../context/AuthContext/AuthContext";
import { useHistory, Link } from "react-router-dom";
import React from "react";

const LoginLogoutButton = () => {
  const { status } = useAuthState();
  const authActions = useAuthDispatch();

  const history = useHistory();
  const onLogout = () => {
    authActions({ type: "logout" });
    history.push("/login");
  };

  return status === "authenticated" ? (
    <button data-testid="logout-button" onClick={() => onLogout()}>
      Sign Out
    </button>
  ) : (
    <Link to='/login'>
      <button data-testid="login-button">
        Sign In
      </button>
    </Link>
  );
};

export default LoginLogoutButton;
