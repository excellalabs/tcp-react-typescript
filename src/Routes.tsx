import { Route, Switch, Redirect } from 'react-router-dom'

import SkillsPage  from './pages/Skills/Skills'
import LoginComponent from './pages/Login/Login'
import React from 'react'
import CategoriesPage from './pages/Categories/Categories'
import EmployeePage from './pages/Employee/Employee'
import EmployeesPage from './pages/Employees/Employees'
import HomePage from './pages/Home/Home'

export const Routes = () => (
  <Switch>
    <Route exact path="/" render={() => <Redirect to="/home" />} />
    <Route exact path="/home" component={HomePage} />
    <Route exact path="/login" component={LoginComponent} />
    <Route exact path="/employee/add" component={EmployeePage} />
    <Route exact path="/employee/list" component={EmployeesPage} />
    <Route exact path="/employee/self" render={({ match }) => <div>Manage Current User Skills</div>} />
    <Route exact path="/employee/:id" component={EmployeePage} />
    <Route exact path="/admin/categories" component={CategoriesPage} />
    <Route exact path="/admin/skills" component={SkillsPage} />
    <Route component={() => <div>Page not found</div>} />
  </Switch>
)