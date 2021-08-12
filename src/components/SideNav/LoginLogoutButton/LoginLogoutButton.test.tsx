import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import {
  AuthProvider,
  useAuthDispatch,
} from '../../../context/AuthContext/AuthContext'
import LoginLogoutButton from './LoginLogoutButton'
import { BrowserRouter } from 'react-router-dom'

const TestComponent = () => {
  const action = useAuthDispatch()

  return (
    <button
      data-testid={'login-button'}
      onClick={() => action({ type: 'loginSuccess' })}
    >
      clickme{' '}
    </button>
  )
}

describe('LoginLogoutButton', () => {
  beforeEach(() => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <TestComponent />
          <LoginLogoutButton />
        </BrowserRouter>
      </AuthProvider>
    )
  })
  it('renders Login by default', () => {
    expect(screen.getByText(/Login/)).toBeInTheDocument()
  })
  it('renders Logout correctly', () => {
    const button = screen.getByTestId('login-button')
    fireEvent.click(button)

    expect(screen.getByText(/Logout/)).toBeInTheDocument()
  })
})
