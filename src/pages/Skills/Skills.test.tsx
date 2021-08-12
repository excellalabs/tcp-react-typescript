import React from 'react'
import SkillsPage from './Skills'
import { AuthProvider } from '../../context/AuthContext/AuthContext'
import { render, screen } from '@testing-library/react'

describe('Skills page', () => {
  beforeEach(() => {
    render(
      <AuthProvider>
        <SkillsPage />
      </AuthProvider>
    )
  })

  it('renders the Skills Form page', () => {
    expect(screen.getByLabelText(/Skill Name/)).toBeInTheDocument()
  })

  it('renders the Skill Table page', () => {
    expect(screen.getByText(/Skill Category/)).toBeInTheDocument()
  })
})
