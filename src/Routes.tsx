import { Redirect, Route, Switch } from "react-router-dom";

import CategoriesPage from "./pages/Categories/Categories";
import EmployeeForm from "./pages/EmployeeForm/EmployeeForm";
import EmployeeFormContainer from "./pages/EmployeeForm/EmployeeFormContainer";
import EmployeesPage from "./pages/Employees/Employees";
import HomePage from "./pages/Home/Home";
import LoginComponent from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
import React from "react";
import SkillsPage from "./pages/Skills/Skills";

export const Routes = () => (
  <Switch>
    <Route exact path="/" render={() => <Redirect to="/home" />} />
    <Route exact path="/home" component={HomePage} />
    <Route exact path="/login" component={LoginComponent} />
    <Route exact path="/employee/add" component={EmployeeForm} />
    <Route exact path="/employee/list" component={EmployeesPage} />
    <Route
      exact
      path="/employee/self"
      render={({ match }) => <div>Manage Current User Skills</div>}
    />
    <Route exact path="/employee/:id" component={EmployeeFormContainer} />
    <Route exact path="/employee/edit/:id" component={EmployeeFormContainer} />
    <Route exact path="/admin/categories" component={CategoriesPage} />
    <Route exact path="/admin/skills" component={SkillsPage} />
    <Route component={NotFound} />
  </Switch>
);
