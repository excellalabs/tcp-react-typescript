import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import AdminRoute from './AdminRoute'
import {
  AuthProvider,
  useAuthDispatch,
} from '../../../context/AuthContext/AuthContext'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from '../../../context/UserContext/UserContext'

const expectedToken =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbiIsInNjb3BlIjpbInJlYWQiLCJ3cml0ZSJdLCJleHAiOjE1OTc5NTI0MTYsImF1dGhvcml0aWVzIjpbIlJPTEVfQURNSU4iXSwianRpIjoiNDUxOWY3NDctZTdiOC00NTI1LTkzM2ItODdiZmJkZjU4ZTkxIiwiZW1haWwiOiJsZXNsaWUua25vcGVAaW4ucGFya3MuZ292IiwiY2xpZW50X2lkIjoiYXBwIn0.BbedOYHWsrebgVE1_H9sRwXgnNV-9y4g-swdTUAtVkDhrV1F7n-CqCQA2kC2QkR6gmnagfPUEoYHm_IT9e8AaBxy99C5qqnHSf1zDIeeDN3ouIZQCBo2i-o3tDU_z-n5fSohR2g89e3D6OTklnnKuuowPog-JaB21N8XOIbXMIvfXszMagQ3V2GzBbVdY001ZSlxlDYtxOA-RW7OnO9b__kF79GF_qGcyUdJ7bG7bcFXecC-snUpFRAKs6mfamw6duB-GyH5jyjzZL5daFCtDh7gimuXKyYj4V4j688c2AMJlDUQWjsHyAEcw_Dz3H_I7Lcsg4o2OBuioZ7RSTwAiw'

beforeAll(() => {
  global.Storage.prototype.getItem = jest.fn(() => expectedToken)
})

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
        <AdminRoute render={() => <div>admin</div>} />
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

  it("renders 'admin' when authenticated as an admin", async () => {
    const button = screen.getByTestId('login-button')
    fireEvent.click(button)

    await waitFor(() => {
      expect(screen.getByText('admin')).toBeInTheDocument()
    })
  })
})
