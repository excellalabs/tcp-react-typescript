import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
  useAuthDispatch,
  useAuthState,
} from '../../context/AuthContext/AuthContext'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input'
import { LoginInfo } from '../../context/UserContext/UserContext'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => {
  return {
    root: {
      textAlign: 'left',
      padding: '16px',
    },
    error: {
      color: 'red',
    },
  }
})

const Login: React.FC<{}> = () => {
  const { error: authError, status } = useAuthState()
  const authActions = useAuthDispatch()
  const history = useHistory()

  useEffect(() => {
    // Redirect to home on successful login
    if (status === 'authenticated') {
      history.push('/')
    }
  }, [status, history])

  const [loginInfo, setLoginInfo] = React.useState({
    username: '',
    password: '',
  } as LoginInfo)

  const handleLogin = () => {
    authActions({
      type: 'login',
      payload: { ...loginInfo },
    })
  }

  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <h2>Login</h2>
      <form>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Input
              placeholder="Username"
              data-testid="login-username"
              onChange={(e) =>
                setLoginInfo({ ...loginInfo, username: e.target.value })
              }
            />
          </Grid>
          <Grid item>
            <Input
              type="password"
              placeholder="Password"
              data-testid="login-password"
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
  )
}

export default Login
