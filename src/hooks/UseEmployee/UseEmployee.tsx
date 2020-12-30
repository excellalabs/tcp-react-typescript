import { Employee, IEmployee } from "../../models/Employee.interface";
import { useCallback, useEffect, useMemo, useState } from "react";

import EmployeeService from "../../services/Employee/EmployeeService";
import { useAuthState } from "../../context/AuthContext/AuthContext";

const useEmployee = () => {
  // Initialize API service
  const { status, token } = useAuthState();
  const employeeService = useMemo(() => {
    return new EmployeeService(token);
  }, [token]);

  // Local state
  const [employees, setEmployees] = useState([] as Employee[]);
  const [listUpdated, setListUpdated] = useState(false);

  // Functions to be passed out from hook
  const createEmployee = (employee: IEmployee) => {
    setListUpdated(true);
    return employeeService.create(employee);
  };

  const updateEmployee = (employee: IEmployee) => {
    setListUpdated(true);
    return employeeService.update(employee);
  };

  const deleteEmployee = (id: number) => {
    setListUpdated(true);
    return employeeService.delete(id);
  };

  const getEmployeeById = useCallback(
    (id: number) => {
      return employeeService.getById(id);
    },
    [employeeService]
  );


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
    fetchEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
  };
};

export default useEmployee;
