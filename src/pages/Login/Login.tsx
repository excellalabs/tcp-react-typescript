import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  useAuthDispatch,
  useAuthState,
} from "../../context/AuthContext/AuthContext";

import { LoginInfo } from "../../context/UserContext/UserContext";
import * as styles from './login.module.scss';


const Login: React.FC<{}> = () => {
  const { error: authError, status } = useAuthState();
  const authActions = useAuthDispatch();
  const history = useHistory();

  useEffect(() => {
    // Redirect to home on successful login
    if (status === "authenticated") {
      history.push("/");
    }
  }, [status, history]);

  const [loginInfo, setLoginInfo] = React.useState({
    username: "",
    password: "",
  } as LoginInfo);

  const handleLogin = () => {
    authActions({
      type: "login",
      payload: { ...loginInfo },
    });
  };


  return (
    <div className={`${styles.root} greySectionCard`}>
      <h2 className={`${styles.loginHeader}`} aria-label="login-header">Login</h2>
      <form>
        <div>
          <div>
            <input
              placeholder="Username"
              data-testid="login-username"
              aria-label="login-username"
              onChange={(e) =>
                setLoginInfo({ ...loginInfo, username: e.target.value })
              }
            />
          </div>
          <div >
            <input
              type="password"
              placeholder="Password"
              data-testid="login-password"
              aria-label="login-password"
              onChange={(e) =>
                setLoginInfo({ ...loginInfo, password: e.target.value })
              }
            />
          </div>
          <div >
            <button
              data-testid="submit-button"
              onClick={() => handleLogin()}
              aria-label="submit-login-button"
            >
              Submit
            </button>
            {authError && (
              <p data-testid="login-error" aria-label="login-error" className={styles.error}>
                {authError}
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
