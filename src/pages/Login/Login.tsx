import React from "react";
import {
  useUserState,
  useUserDispatch,
  LoginInfo,
} from "../../context/UserContext/UserContext";
import Card from "@material-ui/core/Card";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => {
  return {
    root: {
      textAlign: "left",
      padding: "16px",
    },
  };
});

const Login: React.FC<{}> = () => {
  const { error } = useUserState();
  const callUserAction = useUserDispatch();

  const [loginInfo, setLoginInfo] = React.useState({
    username: "",
    password: "",
  } as LoginInfo);

  const login = () => {
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
              onClick={() => login()}
            >
              Submit
            </Button>
            {error && <p data-testid="login-error">{error}</p>}
          </Grid>
        </Grid>
      </form>
    </Card>
  );
};

export default Login;
