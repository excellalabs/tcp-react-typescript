import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import ForgeUsers from './ForgeUsers'

describe('<ForgeUsers />', () => {
  it('shows the list of users', async () => {
    render(<ForgeUsers />)
    await waitFor(() => {
      expect(screen.getByText('From Mswhandler')).toBeInTheDocument()
    })
  })
})
