import { useState, useCallback, useEffect, useMemo } from "react";
import { Employee, IEmployee } from "../../models/Employee.interface";
import { useAuthState } from "../../context/AuthContext/AuthContext";
import EmployeeService from "../../services/Employee/EmployeeService";

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

  return { employees, createEmployee };
};

export default useEmployee;
