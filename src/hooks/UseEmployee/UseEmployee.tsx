import { Employee, IEmployee } from '../../models/Employee.interface'
import { useCallback, useEffect, useMemo, useState } from 'react'

import EmployeeService from '../../services/Employee/EmployeeService'
import { IEmployeeForm } from '../../pages/EmployeeForm/EmployeeForm.schema'
import { useAuthState } from '../../context/AuthContext/AuthContext'

const useEmployee = () => {
  // Initialize API service
  const { status, token } = useAuthState()
  const employeeService = useMemo(() => {
    return new EmployeeService(token)
  }, [token])

  // Local state
  const [employees, setEmployees] = useState([] as Employee[])
  const [listUpdated, setListUpdated] = useState(false)

  // Functions to be passed out from hook
  const createEmployee = (employee: IEmployee) => {
    setListUpdated(true)
    return employeeService.create(employee)
  }

  const updateEmployee = (employee: IEmployee) => {
    setListUpdated(true)
    return employeeService.update(employee)
  }

  const deleteEmployee = (id: number) => {
    setListUpdated(true)
    return employeeService.delete(id)
  }

  const getEmployeeById = useCallback(
    (id: number) => {
      return employeeService.getById(id)
    },
    [employeeService]
  )

  const getEmployeeFormDataById = useCallback(
    (id: number): Promise<IEmployeeForm> => {
      return employeeService
        .getById(id)
        .then((response) => employeeToFormSchema(response.data))
    },
    [employeeService]
  )

  function employeeToFormSchema(employee: IEmployee): IEmployeeForm {
    return {
      bio: employee.bio,
      contact: {
        email: employee.contact.email,
        phoneNumber: employee.contact.phoneNumber,
        address1: employee.contact.address.line1,
        address2: employee.contact.address.line2 ?? '',
        city: employee.contact.address.city,
        state: employee.contact.address.stateCode,
        zipCode: employee.contact.address.zipCode,
      },
      skills: employee.skills.map((s) => ({
        skill: s.skill.name,
        proficiency: s.proficiency,
        primary: s.primary,
      })),
    }
  }

  const fetchEmployees = useCallback(
    async () => {
      employeeService
        .get()
        .then((res) => {
          res.status === 200
            ? setEmployees(
                res.data.map((item) => {
                  return new Employee(item)
                })
              )
            : setEmployees([])
        })
        .catch((error) => {
          console.log(error)
        })
    },
    /* eslint-disable react-hooks/exhaustive-deps */
    [employeeService, listUpdated]
  )

  useEffect(
    () => {
      if (status === 'authenticated') {
        fetchEmployees()
      }
    },
    /* eslint-disable react-hooks/exhaustive-deps */
    [fetchEmployees, status, listUpdated]
  )

  return {
    employees,
    createEmployee,
    fetchEmployees,
    getEmployeeById,
    getEmployeeFormDataById,
    updateEmployee,
    deleteEmployee,
  }
}

export default useEmployee
