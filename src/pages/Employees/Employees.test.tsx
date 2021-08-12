import EmployeesPage, {
  doSearchAndFilter,
  employeeActionsColumn,
  employeeEmailColumn,
  employeeNameColumn,
  employeeSkillsColumn,
} from './Employees'
import { javaSkill, scrumMasterSkill } from 'mocks/data/skill'
import { render, screen } from '@testing-library/react'

import { AuthProvider } from '../../context/AuthContext/AuthContext'
import React from 'react'
import { UserProvider } from '../../context/UserContext/UserContext'
import { employees } from 'mocks/data/employee'

describe('Employees page', () => {
  beforeEach(() => {
    render(
      <AuthProvider>
        <UserProvider>
          <EmployeesPage />
        </UserProvider>
      </AuthProvider>
    )
  })

  it('renders the employees table', () => {
    // Look for Table Column Headers
    expect(screen.getByText('Employee Name')).toBeInTheDocument()
    expect(screen.getByText('Employee Email')).toBeInTheDocument()
    expect(screen.getByText('Skills')).toBeInTheDocument()
  })
})

describe('table columns', () => {
  describe('name column', () => {
    it('should have the right title', () => {
      expect(employeeNameColumn.headerLabel).toEqual('Employee Name')
    })
    it('should sort on fullname', () => {
      expect(employeeNameColumn.propertyName).toEqual('fullName')
    })
    it('should render the employee fullname', () => {
      expect(employeeNameColumn.renderer(employees[0])).toEqual(
        employees[0].fullName
      )
    })
  })
  describe('email column', () => {
    it('should have the right title', () => {
      expect(employeeEmailColumn.headerLabel).toEqual('Employee Email')
    })
    it('should sort on email', () => {
      expect(employeeEmailColumn.propertyName).toEqual('email')
    })
    it('should render the employee email', () => {
      expect(employeeEmailColumn.renderer(employees[0])).toEqual(
        employees[0].email
      )
    })
  })
  describe('skills column', () => {
    it('should have the right title', () => {
      expect(employeeSkillsColumn.headerLabel).toEqual('Skills')
    })
    it('should sort on skills', () => {
      expect(employeeSkillsColumn.propertyName).toEqual('skills')
    })
    it('should render the employee skills in a ChipList', () => {
      render(employeeSkillsColumn.renderer(employees[0]) as React.ReactElement)
      expect(
        screen.getByText(employees[0].skills[0].skill.name)
      ).toBeInTheDocument()
    })
  })
})

describe('doSearchAndFilter', () => {
  // Default behavior
  it('should return the original list when searchText and filters are both empty', () => {
    expect(doSearchAndFilter(employees, '', [])).toEqual(employees)
  })

  // SEARCH
  it('should search by first name', () => {
    const results = doSearchAndFilter(employees, employees[0].firstName, [])
    expect(results).toEqual(
      employees.filter((e) => e.firstName === employees[0].firstName)
    )
    expect(results.length).toBe(1) // Only John
  })
  it('should search by last name', () => {
    const results = doSearchAndFilter(employees, employees[0].lastName, [])
    expect(results).toEqual(
      employees.filter((e) => e.lastName === employees[0].lastName)
    )
    expect(results.length).toBe(3) // John, Dean, and Sam
  })
  it('should search without case sensitivity', () => {
    expect(
      doSearchAndFilter(employees, employees[0].firstName.toUpperCase(), [])
    ).toEqual(employees.filter((e) => e.firstName === employees[0].firstName))
    expect(
      doSearchAndFilter(employees, employees[0].firstName.toLowerCase(), [])
    ).toEqual(employees.filter((e) => e.firstName === employees[0].firstName))
  })

  // FILTER
  it('should filter by skill', () => {
    expect(doSearchAndFilter(employees, '', [scrumMasterSkill.name])).toEqual(
      employees.filter((e) =>
        e.skills.some((s) => s.skill.name === scrumMasterSkill.name)
      )
    )
  })
  it('should filter by multiple skills', () => {
    expect(
      doSearchAndFilter(employees, '', [scrumMasterSkill.name, javaSkill.name])
    ).toEqual(
      employees
        .filter((e) =>
          e.skills.some((s) => s.skill.name === scrumMasterSkill.name)
        )
        .filter((e) => e.skills.some((s) => s.skill.name === javaSkill.name))
    )
  })

  // SEARCH AND FILTER
  it('should search AND filter', () => {
    expect(
      doSearchAndFilter(employees, employees[0].lastName, [
        scrumMasterSkill.name,
      ])
    ).toEqual([employees[0]]) // Only "Winchester" with the ScrumMaster skill
  })
})
