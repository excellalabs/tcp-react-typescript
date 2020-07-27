import React from "react";
import {
  useUserState,
  useUserDispatch,
} from "../context/UserContext/UserContext";

const SignIn: React.FC<{}> = () => {
  const { loggedIn } = useUserState();
  const callUserAction = useUserDispatch();

  const login = () => {
    callUserAction({ type: "login" });
  };
  const logout = () => {
    callUserAction({ type: "logout" });
  };

  if (loggedIn) return <button onClick={logout}>Log Out</button>;
  return <button onClick={login}>Sign In</button>;
};

export default SignIn;
