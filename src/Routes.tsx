import { Route, Switch, Redirect } from "react-router-dom";

import SkillsPage from "./pages/Skills/Skills";
import LoginComponent from "./pages/Login/Login";
import React from "react";
import CategoriesPage from "./pages/Categories/Categories";
import EmployeesPage from "./pages/Employees/Employees";
import HomePage from "./pages/Home/Home";
import EmployeeForm from "./pages/EmployeeForm/EmployeeForm";
import NotFound from "./pages/NotFound/NotFound";
import AdminRoute from "./components/Route/AdminRoute/AdminRoute";
import UserRoute from "./components/Route/UserRoute/UserRoute";

export const Routes = () => (
  <Switch>
    <Route exact path="/" render={() => <Redirect to="/home" />} />
    <UserRoute exact path="/home" component={HomePage} />
    <Route exact path="/login" component={LoginComponent} />

    <AdminRoute exact path="/employee/add" component={EmployeeForm} />
    <UserRoute exact path="/employee/list" component={EmployeesPage} />
    <UserRoute
      exact
      path="/employee/self"
      render={({ match }) => <div>Manage Current User Skills</div>}
    />
    <AdminRoute exact path="/employee/:id" component={EmployeeForm} />
    <AdminRoute exact path="/admin/categories" component={CategoriesPage} />
    <AdminRoute exact path="/admin/skills" component={SkillsPage} />
    <Route component={NotFound} />
  </Switch>
);
