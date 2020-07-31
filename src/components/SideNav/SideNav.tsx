import React from "react";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import { useAuth } from "../../context/AuthContext/AuthContext";
import { useUserState } from "../../context/UserContext/UserContext";

function ListItemLink(props: any) {
  return <ListItem button component="a" {...props} />;
}

const LoginLogoutLink = () => {
  const { status, logout } = useAuth();
  const { email } = useUserState();
  return status === "authenticated" ? (
    <ListItemLink onClick={() => logout()} to={"/login"}>
      <ListItemText primary={`Logout: ${email}`} />
    </ListItemLink>
  ) : (
    <ListItemLink component={Link} to={"/login"}>
      <ListItemText primary={"Login"} />
    </ListItemLink>
  );
};

export class SideNav extends React.Component {
  render() {
    return (
      <div>
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
        <List
          component="nav"
          aria-labelledby="list-subheader"
          subheader={
            <ListSubheader component="div" id="list-subheader">
              Admin Actions
            </ListSubheader>
          }
        >
          <ListItemLink href="/employee/add">
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
        <List>
          <LoginLogoutLink />
        </List>
      </div>
    );
  }
}
