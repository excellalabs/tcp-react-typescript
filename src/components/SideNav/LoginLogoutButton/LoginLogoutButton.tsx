import {
  useAuthDispatch,
  useAuthState,
} from '../../../context/AuthContext/AuthContext'
import { useHistory, Link } from 'react-router-dom'
import React from 'react'
import { ListItemText } from '@material-ui/core'
import { ListItemLink } from '../SideNav'

const LoginLogoutButton = () => {
  const { status } = useAuthState()
  const authActions = useAuthDispatch()

  const history = useHistory()
  const onLogout = () => {
    authActions({ type: 'logout' })
    history.push('/login')
  }

  return status === 'authenticated' ? (
    <ListItemLink onClick={() => onLogout()}>
      <ListItemText data-testid="logout-sidenav" primary={'Logout'} />
    </ListItemLink>
  ) : (
    <ListItemLink component={Link} to={'/login'}>
      <ListItemText data-testid="login-sidenav" primary={'Login'} />
    </ListItemLink>
  )
}

export default LoginLogoutButton
