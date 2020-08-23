import { DataColumn, DataTable } from "../../components/DataTable/DataTable";
import {
  FilterOption,
  SearchAndFilter,
} from "../../components/SearchAndFilter/SearchAndFilter";
import React, { useEffect, useState } from "react";

import { Button } from "@material-ui/core";
import { ChipList } from "../../components/ChipList/ChipList";
import { Employee } from "../../models/Employee.interface";
import useEmployee from "../../hooks/UseEmployee/UseEmployee";
import { useHistory } from "react-router-dom";
import useSkill from "../../hooks/UseSkill/UseSkill";
import { useUserState } from "../../context/UserContext/UserContext";

export const employeeNameColumn: DataColumn<Employee> = {
  propertyName: "fullName",
  headerLabel: "Employee Name",
  isNumeric: false,
  renderer: (data: Employee) => data.fullName,
};

export const employeeEmailColumn: DataColumn<Employee> = {
  propertyName: "email",
  headerLabel: "Employee Email",
  isNumeric: false,
  renderer: (data: Employee) => data.email,
};

export const employeeSkillsColumn: DataColumn<Employee> = {
  propertyName: "skills",
  headerLabel: "Skills",
  isNumeric: false,
  renderer: (data: Employee) => {
    const sortedSkills = data.skills.sort((a, b) => {
      // If same "priority", sort aslphabetically
      if (a.primary === b.primary) {
        return a.skill.name.localeCompare(b.skill.name);
      }
      // Push primary skills to the front
      if (a.primary) {
        return -1;
      }
      return 1;
    });
    return <ChipList skills={sortedSkills}></ChipList>;
  },
};

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
  // We also likely want pagination to be done on the back-end??  Would be a heavy lift on this code to do

  // Fetch emplolyees from API
  const { employees, fetchEmployees, deleteEmployee } = useEmployee();
  const history = useHistory();

  // Fetch skills from API
  const { skills } = useSkill();
  const filterOptions = skills.map((s) => ({ name: s.name, value: s }));

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

  const handleDelete = (id: number): void => {
    deleteEmployee(id).then(() => {
      fetchEmployees();
    });
  };

  // setup columns
  const { isAdmin } = useUserState();
  const employeeActionsColumn: DataColumn<Employee> = {
    propertyName: "id",
    headerLabel: "Actions",
    isNumeric: false,
    renderer: (data: Employee) => (
      <>
        <Button onClick={() => history.push(`/employee/edit/${data.id}`)}>
          Edit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleDelete(data.id)}
        >
          Delete
        </Button>
      </>
    ),
  };
  function columns(isAdmin: Boolean): DataColumn<Employee>[] {
    const userColumns: DataColumn<Employee>[] = [
      employeeNameColumn,
      employeeEmailColumn,
      employeeSkillsColumn,
    ];

    if (isAdmin) {
      userColumns.push(employeeActionsColumn);
    }

    return userColumns;
  }

  return (
    <>
      <SearchAndFilter
        searchBy="Employee Name"
        filterBy="Skill"
        filterOptions={filterOptions}
        handleSearch={handleSearch}
        handleFilter={handleFilter}
      ></SearchAndFilter>
      <DataTable<Employee>
        columns={columns(isAdmin)}
        rows={employeeList}
        initialSortProperty="fullName"
      />
    </>
  );
};

export default EmployeesPage;
