import CategoryTable, { ICategoryWithSkillCount } from './CategoryTable'
import { fireEvent, render, screen } from '@testing-library/react'

import React from 'react'
import { act } from 'react-dom/test-utils'
import categories from '../../../mocks/data/category'

describe('CategoryTable page', () => {
  let skilledCategories: ICategoryWithSkillCount[]
  let editHandler: (id: number) => void
  let deleteHandler: (id: number) => void

  beforeEach(() => {
    // Fetch Data (mocked)
    skilledCategories = categories.map((c, idx) => ({
      ...c,
      skillCount: idx + 1,
    }))
    editHandler = jest.fn((id: number) => {})
    deleteHandler = jest.fn((id: number) => {})

    render(
      <CategoryTable
        categories={skilledCategories}
        editCategory={editHandler}
        deleteCategory={deleteHandler}
      />
    )
  })

  it('should fire a delete event with correct ID', async () => {
    // Arrange
    const deleteBtns = await screen.findAllByText('DELETE')
    const sortedCategories = categories.sort((a, b) =>
      a.name.localeCompare(b.name)
    )

    // Act
    act(() => {
      fireEvent(
        deleteBtns[0],
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      )
    })

    // Assert
    expect(deleteHandler).toHaveBeenCalled()
    expect(deleteHandler).toHaveBeenCalledTimes(1)
    expect(deleteHandler).toHaveBeenCalledWith(sortedCategories[0].id)
  })

  it('should fire a edit event with correct ID', async () => {
    // Arrange
    const editBtns = await screen.findAllByText('EDIT')
    const sortedCategories = categories.sort((a, b) =>
      a.name.localeCompare(b.name)
    )

    // Act
    act(() => {
      fireEvent(
        editBtns[0],
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      )
    })

    // Assert
    expect(editHandler).toHaveBeenCalled()
    expect(editHandler).toHaveBeenCalledTimes(1)
    expect(editHandler).toHaveBeenCalledWith(sortedCategories[0].id)
  })
})
