import React from "react";
import {
  useEmployeeDispatch,
  useEmployeeState,
} from "../../context/EmployeeContext/EmployeeContext";

const HomePage: React.FC<{}> = () => {
  const employeeActions = useEmployeeDispatch();
  const { loading, employees } = useEmployeeState();
  return (
    <>
      <button
        onClick={() => {
          employeeActions({ type: "getEmployees" });
        }}
      >
        fetch employees
      </button>
      <div>employees: {employees?.length ?? 0}</div>
    </>
  );
};

export default HomePage;
