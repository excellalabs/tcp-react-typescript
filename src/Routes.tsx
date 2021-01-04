import { Redirect, Route, Switch } from "react-router-dom";
import HomePage from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import React from "react";

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/home" />} />
      <Route exact path="/home" component={HomePage} />
      <Route component={NotFound} />
    </Switch>
  );
};
