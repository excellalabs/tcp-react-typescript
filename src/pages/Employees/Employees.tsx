import { DataColumn, DataTable } from "../../components/DataTable/DataTable";
import {
  FilterOption,
  SearchAndFilter,
} from "../../components/SearchAndFilter/SearchAndFilter";
import React, { useEffect, useState } from "react";

import { ChipList } from "../../components/ChipList/ChipList";
import { Employee } from "../../models/Employee.interface";
import useEmployee from "../../hooks/UseEmployee/UseEmployee";

// REPLACE THESE WITH REAL DATA FROM API
const skills: FilterOption[] = [
  { name: "JavaScript", value: "JavaScript" },
  { name: "Java", value: "Java" },
  { name: "Scrum Master", value: "Scrum Master" },
  { name: "React", value: "React" },
  { name: "Data Analysis", value: "Data Analysis" },
];

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

export function doSearchAndFilter(
  employees: Employee[],
  searchText: string,
  desiredSkills: string[]
): Employee[] {
  // Apply skill filters, if there are any
  const lowercaseDesiredSkills = desiredSkills.map((dS) => dS.toLowerCase());
  const filteredEmployees = desiredSkills.length
    ? employees.filter((e) =>
        lowercaseDesiredSkills.every((lDS) =>
          e.skills.some((s) => s.skill.name.toLowerCase() === lDS)
        )
      )
    : employees;
  // Do search by filtering by case-insensitive match to name, if the search text is not empty
  const cleanedSearchText = searchText.trim();
  return cleanedSearchText.length
    ? filteredEmployees.filter((e) =>
        e.fullName.toLowerCase().includes(searchText.toLowerCase())
      )
    : filteredEmployees;
}

const EmployeesPage: React.FC<{}> = () => {
  // Employees should come from the API, instead of dummy data
  // We also likely want pagination to be done on the back-end??  Would be a heavy lift on this code to do

  // Columns should be modified to include/exclude the edit column based on User Role

  // Fetch emplolyees from API
  const { employees } = useEmployee();

  const [employeeList, setEmployeeList] = useState<Employee[]>([]);

  // Update the list when the API data updates
  useEffect(() => {
    setEmployeeList(employees);
  }, [employees]);

  // Manage search/filter settings
  const [searchText, setSearchText] = useState<string>("");
  const [filters, setFilters] = useState<FilterOption[]>([]);

  const handleSearch = (newSearchText: string) => {
    // Store the new search string for use by handleFilter later
    setSearchText(newSearchText);

    // Perform the search and update the displayed list
    const newEmployeeList = doSearchAndFilter(
      employees,
      newSearchText,
      filters.map((f) => f.name)
    );
    setEmployeeList(newEmployeeList);
  };

  const handleFilter = (newFilters: FilterOption[]) => {
    // Store the new filters for use by handleSearch later
    setFilters(newFilters);

    // Perform the filter and update the displayed list
    const filteredEmployees = doSearchAndFilter(
      employees,
      searchText,
      newFilters.map((f) => f.name)
    );
    setEmployeeList(filteredEmployees);
  };

  return (
    <>
      <SearchAndFilter
        searchBy="Employee Name"
        filterBy="Skill"
        filterOptions={skills} // REPLACE WITH SKILLS FROM API
        handleSearch={handleSearch}
        handleFilter={handleFilter}
      ></SearchAndFilter>
      <DataTable<Employee>
        columns={columns}
        rows={employeeList}
        initialSortProperty="fullName"
      />
    </>
  );
};

export default EmployeesPage;
