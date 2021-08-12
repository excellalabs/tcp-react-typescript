import { IEmployeeForm, defaultValues } from './EmployeeForm.schema'
import React, { useEffect, useState } from 'react'
import { Redirect, useParams } from 'react-router-dom'

import { AxiosResponse } from 'axios'
import EmployeeForm from './EmployeeForm'
import { IEmployee } from '../../models/Employee.interface'
import useEmployee from '../../hooks/UseEmployee/UseEmployee'

export enum ResponseStatus {
  UNKNOWN = 'unknown',
  SUCCESS = 'success',
  ERROR = 'error',
}

export const EmployeeFormContainer: React.FC<{}> = () => {
  const [employeeToEdit, setEmployeeToEdit] =
    useState<IEmployeeForm>(defaultValues)
  const [submitStatus, setSubmitStatus] = useState<ResponseStatus>(
    ResponseStatus.UNKNOWN
  )

  const { createEmployee, updateEmployee, getEmployeeFormDataById } =
    useEmployee()
  // Handle loading form data when editing an employee
  interface EmployeeParams {
    id: string;
  }

  const params = useParams<EmployeeParams>();
  // params are strings containing numbers our code expects an id to be a number
  const id = parseInt(params.id)
  useEffect(() => {
    async function getEmployeeData() {
      const employeeData = await getEmployeeFormDataById(id)
      setEmployeeToEdit(employeeData)
    }

    getEmployeeData()
  }, [id, getEmployeeFormDataById])

  // Respond to submitting an Employee
  function handleResponse(call: Promise<AxiosResponse<IEmployee>>): void {
    call
      .then(() => {
        setSubmitStatus(ResponseStatus.SUCCESS)
      })
      .catch(() => {
        setSubmitStatus(ResponseStatus.ERROR)
      })
  }
  function handleSubmit(employee: IEmployee): void {
    if (id) {
      const employeeToUpdate = { ...employee, id }
      handleResponse(updateEmployee(employeeToUpdate))
    } else {
      handleResponse(createEmployee(employee))
    }
  }

  if (submitStatus === ResponseStatus.SUCCESS) {
    return <Redirect to="/employee/list" />
  }

  return (
    <>
      <EmployeeForm
        employeeData={employeeToEdit}
        submitEmployee={handleSubmit}
      ></EmployeeForm>
      {submitStatus === ResponseStatus.ERROR && (
        <p>There was an error with the submission.</p>
      )}
    </>
  )
}

export default EmployeeFormContainer
