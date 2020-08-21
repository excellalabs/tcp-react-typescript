import { useState, useCallback, useEffect, useMemo } from "react";
import { Employee, IEmployee } from "../../models/Employee.interface";
import { IEmployeeForm } from "../../pages/EmployeeForm/EmployeeForm.schema";
import { useAuthState } from "../../context/AuthContext/AuthContext";
import EmployeeService from "../../services/Employee/EmployeeService";

import * as Yup from "yup";

const useEmployee = () => {
  const { status, token } = useAuthState();

  const [employees, setEmployees] = useState([] as Employee[]);
  const [listUpdated, setListUpdated] = useState(false);

  const employeeService = useMemo(() => {
    return new EmployeeService(token);
  }, [token]);

  const createEmployee = (employee: IEmployee) => {
    setListUpdated(true);
    return employeeService.create(employee);
  };

  const getEmployeeById = (id: number) => {
    return employeeService.getById(id);
  };

  // const [myEmployee, setMyEmployee] = useState<IEmployee | undefined>(
  //   {} as IEmployee
  // );

  const getEmployeeFormDataById = (id: number) => {
    getEmployeeById(id).then((response) => {
      //  setMyEmployee(response.data);
      return employeeToFormSchema(response.data);
    });
  };

  const employeeToFormSchema: IEmployeeForm = (employee: IEmployee) => {
    const employeeFormSchema = Yup.object({
      bio: Yup.object({
        firstName: Yup.string().default(employee.bio.firstName),
        middleInitial: Yup.string().default(employee.bio.middleInitial),
        lastName: Yup.string().default(employee.bio.lastName),
        birthDate: Yup.date().default(employee.bio.birthDate),
        gender: Yup.string().default(employee.bio.gender),
        ethnicity: Yup.string().default(employee.bio.ethnicity),
        usCitizen: Yup.boolean().default(employee.bio.usCitizen),
      }).required(),
      contact: Yup.object({
        email: Yup.string().default(employee.contact.email),
        phoneNumber: Yup.string().default(employee.contact.phoneNumber),
        address1: Yup.string().default(employee.contact.address.line1),
        address2: Yup.string().default(employee.contact.address.line2),
        city: Yup.string().default(employee.contact.address.city),
        state: Yup.string().default(employee.contact.address.stateCode),
        zipCode: Yup.string().default(employee.contact.address.zipCode),
      }).required(),
      skills: Yup.array().default(employee.skills).required(),
    }).required();

    return employeeFormSchema;
  };

  const fetchEmployees = useCallback(
    async () => {
      employeeService
        .get()
        .then((res) => {
          res.status === 200
            ? setEmployees(
                res.data.map((item) => {
                  return new Employee(item);
                })
              )
            : setEmployees([]);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    /* eslint-disable react-hooks/exhaustive-deps */
    [employeeService, listUpdated]
  );

  useEffect(
    () => {
      if (status === "authenticated") {
        fetchEmployees();
      }
    },
    /* eslint-disable react-hooks/exhaustive-deps */
    [fetchEmployees, status, listUpdated]
  );

  return {
    employees,
    createEmployee,
    getEmployeeById,
    getEmployeeFormDataById,
  };
};

export default useEmployee;
