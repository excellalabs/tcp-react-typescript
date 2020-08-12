import { useState, useCallback, useEffect } from "react";
import { Employee } from "../../models/Employee.interface";
import { useAuthState } from "../../context/AuthContext/AuthContext";
import EmployeeService from "../../services/Employee/EmployeeService";

const useEmployee = () => {
  const { status, token } = useAuthState();

  const [employees, setEmployees] = useState([] as Employee[]);

  const fetchEmployees = useCallback(async () => {
    const employeeService = new EmployeeService(token);
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
  }, [token]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchEmployees();
    }
  }, [fetchEmployees, status]);

  return { employees };
};

export default useEmployee;
