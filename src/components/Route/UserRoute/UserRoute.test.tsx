import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import {
  AuthProvider,
  useAuthDispatch,
} from '../../../context/AuthContext/AuthContext'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from '../../../context/UserContext/UserContext'
import UserRoute from './UserRoute'

const TestComponent = () => {
  const authAction = useAuthDispatch()
  return (
    <>
      <button
        data-testid={'login-button'}
        onClick={() => {
          authAction({ type: 'loginSuccess' })
        }}
      >
        click me to authenticate
      </button>
      <BrowserRouter>
        <UserRoute render={() => <div>user</div>} />
      </BrowserRouter>
    </>
  )
}
describe('AdminRoute', () => {
  beforeEach(() => {
    render(
      <AuthProvider>
        <UserProvider>
          <TestComponent></TestComponent>
        </UserProvider>
      </AuthProvider>
    )
  })

  it('renders the 404 page when unAuthenticateds', () => {
    expect(screen.getByText(/404/)).toBeInTheDocument()
  })

  it("renders 'user' when authenticated as an user", async () => {
    const button = screen.getByTestId('login-button')
    fireEvent.click(button)

    await waitFor(() => {
      expect(screen.getByText('user')).toBeInTheDocument()
    })
  })
})
