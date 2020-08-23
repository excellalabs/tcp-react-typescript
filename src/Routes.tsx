import { Redirect, Route, Switch } from "react-router-dom";

import AdminRoute from "./components/Route/AdminRoute/AdminRoute";
import CategoriesPage from "./pages/Categories/Categories";
import EmployeeFormContainer from "./pages/EmployeeForm/EmployeeFormContainer";
import EmployeesPage from "./pages/Employees/Employees";
import HomePage from "./pages/Home/Home";
import LoginComponent from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
import React from "react";
import SkillsPage from "./pages/Skills/Skills";
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

      <AdminRoute
        exact
        path="/employee/add"
        component={EmployeeFormContainer}
      />
      <UserRoute exact path="/employee/list" component={EmployeesPage} />
      <UserRoute
        exact
        path="/employee/self"
        render={({ match }) => <div>Manage Current User Skills</div>}
      />
      <AdminRoute
        exact
        path="/employee/:id"
        component={EmployeeFormContainer}
      />
      <AdminRoute
        exact
        path="/employee/edit/:id"
        component={EmployeeFormContainer}
      />
      <AdminRoute exact path="/admin/categories" component={CategoriesPage} />
      <AdminRoute exact path="/admin/skills" component={SkillsPage} />
      <Route component={NotFound} />
    </Switch>
  );
};
