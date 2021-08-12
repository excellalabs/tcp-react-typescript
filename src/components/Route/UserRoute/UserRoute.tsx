import { RouteProps, Route } from 'react-router-dom'
import React from 'react'
import NotFound from '../../../pages/NotFound/NotFound'
import { useAuthState } from '../../../context/AuthContext/AuthContext'

const UserRoute: React.FC<RouteProps> = ({ ...rest }) => {
  const { status } = useAuthState()
  return status === 'authenticated' ? (
    <Route {...rest} />
  ) : (
    <Route component={NotFound} />
  )
}

export default UserRoute
