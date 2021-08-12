import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { UserProvider, useUserState, useUserDispatch } from './UserContext'
import { AuthProvider } from '../AuthContext/AuthContext'

const UserContextExample: React.FC<{}> = () => {
  const employee = useUserState()
  const callUserAction = useUserDispatch()


  const login = () => {
    callUserAction({
      type: 'populate',
      payload: { ...employee },
    })
  }
  const logout = () => {
    callUserAction({ type: 'clear' })
  }

  if (employee.isAdmin)
    return (
      <button data-testid="logoutButton" onClick={logout}>
        Log Out
      </button>
    )
  return (
    <button data-testid="loginButton" onClick={login}>
      Sign In
    </button>
  )
}

describe('UserContext', () => {
  beforeEach(() => {
    render(
      <AuthProvider>
        <UserProvider>
          <UserContextExample />
        </UserProvider>
      </AuthProvider>
    )
  })

  it('renders default sign in page', () => {
    expect(screen.getByTestId('loginButton')).toBeInTheDocument()
  })

  it('changes state after clicking Log In Button, and then back after clicking log out', () => {
    const signinButton = screen.getByTestId('loginButton')

    fireEvent.click(signinButton)

    const logoutButton = screen.getByTestId('logoutButton')
    expect(logoutButton).toBeInTheDocument()

    fireEvent.click(logoutButton)
    expect(signinButton).toBeInTheDocument()
  })
})
