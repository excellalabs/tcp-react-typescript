import { Redirect, Route, Switch } from "react-router-dom";
import HomePage from "./pages/Home/Home";
import LoginComponent from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
import React from "react";
import UserRoute from "./components/Route/UserRoute/UserRoute";
import { useAuthState } from "./context/AuthContext/AuthContext";

export const Routes = () => {
  const { status } = useAuthState();

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => (
          <Redirect to={status === "authenticated" ? "/home" : "/login"} />
        )}
      />
      <UserRoute exact path="/home" component={HomePage} />
      <Route exact path="/login" component={LoginComponent} />
      <Route component={NotFound} />
    </Switch>
  );
};
