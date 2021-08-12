import React from 'react'
import { render } from '@testing-library/react'
import App from './App'
import { AuthProvider } from './context/AuthContext/AuthContext'
import { UserProvider } from './context/UserContext/UserContext'

test('renders learn react link', () => {
  const { container } = render(
    <AuthProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </AuthProvider>
  )
  expect(container).toBeDefined()
})
