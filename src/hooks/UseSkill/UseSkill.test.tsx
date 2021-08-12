import React from 'react'
import useSkill from './UseSkill'
import {
  useAuthState,
  AuthProvider,
  useAuthDispatch,
} from '../../context/AuthContext/AuthContext'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'

const TestComponent = () => {
  const { skills } = useSkill()
  const { status } = useAuthState()
  const authAction = useAuthDispatch()
  return (
    <>
      <button
        data-testid={'login-button'}
        onClick={() => authAction({ type: 'loginSuccess' })}
      >
        log in
      </button>
      <div data-testid="skills-length">{skills.length}</div>
    </>
  )
}

describe('useSkill hook', () => {
  beforeEach(() => {
    jest.spyOn(window.localStorage.__proto__, 'getItem')
    window.localStorage.__proto__.getItem = jest.fn(() => {
      return 'token'
    })
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )
  })

  it('returns a default empty (length 0) array', () => {
    const length = screen.getByTestId('skills-length')
    expect(length.firstChild?.textContent).toBe('0')
  })

  it('returns a non-zero array when user is logged in', async () => {
    const button = screen.getByTestId('login-button')
    fireEvent.click(button)

    await waitFor(() => {
      const length = screen.getByTestId('skills-length')
      expect(length.firstChild?.textContent).toBe('1')
    })
  })
})
