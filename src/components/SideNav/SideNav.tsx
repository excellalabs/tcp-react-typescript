import React from 'react'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import { Link } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem'
import { useAuthState } from '../../context/AuthContext/AuthContext'
import { useUserState } from '../../context/UserContext/UserContext'
import LoginLogoutButton from './LoginLogoutButton/LoginLogoutButton'

export function ListItemLink(props: any) {
  return <ListItem button component="a" {...props} />
}

const UserLinks = () => {
  const { status } = useAuthState()

  return status === 'authenticated' ? (
    <>
      <List>
        <ListItemLink component={Link} to="/home">
          <ListItemText primary="Home" />
        </ListItemLink>
        <ListItemLink component={Link} to="/employee/self">
          <ListItemText primary="Manage My Skills" />
        </ListItemLink>
        <ListItemLink component={Link} to="/employee/list">
          <ListItemText primary="Employee List" />
        </ListItemLink>
      </List>
      <Divider />
    </>
  ) : (
    <></>
  )
}

const AdminLinks = () => {
  const { status } = useAuthState()
  const { isAdmin } = useUserState()

  return status === 'authenticated' && isAdmin ? (
    <>
      <List
        component="nav"
        aria-labelledby="list-subheader"
        subheader={
          <ListSubheader component="div" id="list-subheader">
            Admin Actions
          </ListSubheader>
        }
      >
        <ListItemLink component={Link} to="/employee/add">
          <ListItemText primary="Add Employee" />
        </ListItemLink>
        <ListItemLink component={Link} to="/admin/skills">
          <ListItemText primary="Manage Skills" />
        </ListItemLink>
        <ListItemLink component={Link} to="/admin/categories">
          <ListItemText primary="Manage Categories" />
        </ListItemLink>
      </List>
      <Divider />
    </>
  ) : (
    <></>
  )
}

export class SideNav extends React.Component {
  render() {
    return (
      <div>
        <UserLinks />
        <AdminLinks />
        <List>
          <LoginLogoutButton />
        </List>
      </div>
    )
  }
}
