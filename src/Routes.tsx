import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

// import AdminRoute from './components/Route/AdminRoute/AdminRoute'
import HomePage from './pages/Home/Home'
import LoginComponent from './pages/Login/Login'
import NotFound from './pages/NotFound/NotFound'
import UserRoute from './components/Route/UserRoute/UserRoute'
import { useAuthState } from './context/AuthContext/AuthContext'
import ForgeUsers from './components/Forge/ForgeUsers'

export const Routes = () => {
  const { status } = useAuthState()

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => (
          <Redirect to={status === 'authenticated' ? '/home' : '/login'} />
        )}
      />
      <UserRoute exact path="/home" component={HomePage} />
      <Route exact path="/login" component={LoginComponent} />
      <Route exact path="/users" component={ForgeUsers} />
      <Route component={NotFound} />
    </Switch>
  )
}
