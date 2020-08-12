import { DataColumn, DataTable } from "../../components/DataTable/DataTable";

import { ChipList } from "../../components/ChipList/ChipList";
import { Employee } from "../../models/Employee.interface";
import React from "react";
import useEmployee from "../../hooks/UseEmployee/UseEmployee";

const columns: DataColumn<Employee>[] = [
  {
    propertyName: "fullName",
    headerLabel: "Employee Name",
    isNumeric: false,
    renderer: (data: Employee) => data.fullName,
  },
  {
    propertyName: "email",
    headerLabel: "Employee Email",
    isNumeric: false,
    renderer: (data: Employee) => data.email,
  },
  {
    propertyName: "skills",
    headerLabel: "Skills",
    isNumeric: false,
    renderer: (data: Employee) => <ChipList skills={data.skills}></ChipList>,
  },
  // Include/exclude this column based on User Role
  {
    propertyName: "id",
    headerLabel: "Actions",
    isNumeric: false,
    renderer: (data: Employee) => (
      <a href={`/employee/edit/${data.id}`}>Edit</a>
    ),
  },
];

const EmployeesPage: React.FC<{}> = () => {
  // Employees should come from the API, instead of dummy data
  // We also likely want pagination to be done on the back-end??  Would be a heavy lift on this code to do

  // Columns should be modified to include/exclude the edit column based on User Role

  const { employees } = useEmployee();

  return (
    <DataTable<Employee>
      columns={columns}
      rows={employees}
      initialSortProperty="fullName"
    />
  );
};

export default EmployeesPage;
