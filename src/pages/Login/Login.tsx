import React from "react";
import {
  useUserDispatch,
  LoginInfo,
} from "../../context/UserContext/UserContext";
import Card from "@material-ui/core/Card";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth } from "../../context/AuthContext/AuthContext";

const useStyles = makeStyles(() => {
  return {
    root: {
      textAlign: "left",
      padding: "16px",
    },
    error: {
      color: "red",
    },
  };
});

const Login: React.FC<{}> = () => {
  const callUserAction = useUserDispatch();
  const { login, error: authError } = useAuth();

  const [loginInfo, setLoginInfo] = React.useState({
    username: "",
    password: "",
  } as LoginInfo);

  const handleLogin = () => {
    login(loginInfo.username, loginInfo.password);
    callUserAction({ type: "login", payload: loginInfo });
  };

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <h2>Login</h2>
      <form>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Input
              placeholder="Username"
              onChange={(e) =>
                setLoginInfo({ ...loginInfo, username: e.target.value })
              }
            />
          </Grid>
          <Grid item>
            <Input
              type="password"
              placeholder="Password"
              onChange={(e) =>
                setLoginInfo({ ...loginInfo, password: e.target.value })
              }
            />
          </Grid>
          <Grid item>
            <Button
              data-testid="submit-button"
              variant="contained"
              color="primary"
              onClick={() => handleLogin()}
            >
              Submit
            </Button>
            {authError && (
              <p data-testid="login-error" className={classes.error}>
                {authError}
              </p>
            )}
          </Grid>
        </Grid>
      </form>
    </Card>
  );
};

export default Login;
