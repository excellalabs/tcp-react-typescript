import { DataColumn, DataTable } from "../../components/DataTable/DataTable";
import {
  Employee,
  IEmployee,
  IEmployeeBio,
  IEmployeeContact,
} from "../../models/Employee.interface";
import {
  ICategory,
  IEmployeeSkill,
  ISkill,
  PROFICIENCY,
} from "../../models/Skill.interface";

import { ChipList } from "../../components/ChipList/ChipList";
import React from "react";

/*  BEGIN TEMPORARY CODE THAT WILL BE REMOVED LATER   */

const agileSkillCategory: ICategory = { id: 0, name: "Agile" };
const techSkillCategory: ICategory = { id: 1, name: "Technology" };
const scrumMasterSkill: ISkill = {
  id: 0,
  name: "Scrum Master",
  category: agileSkillCategory,
};
const reactSkill: ISkill = {
  id: 1,
  name: "React",
  category: techSkillCategory,
};
const javaSkill: ISkill = { id: 2, name: "Java", category: techSkillCategory };

function createEmployee(
  firstName: string,
  lastName: string,
  email: string,
  primarySkill: ISkill,
  otherSkills: ISkill[]
): Employee {
  return new Employee({
    bio: {
      firstName,
      lastName,
    } as IEmployeeBio,
    contact: {
      email,
    } as IEmployeeContact,
    skills: [
      { skill: primarySkill, proficiency: PROFICIENCY.HIGH, primary: true },
      ...otherSkills.map((s) => ({
        skill: s,
        proficiency: PROFICIENCY.MID,
        primary: false,
      })),
    ] as IEmployeeSkill[],
  } as IEmployee);
}

/*  END TEMPORARY CODE THAT WILL BE REMOVED LATER   */

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
];

const EmployeesPage: React.FC<{}> = () => {
  /*  Later, this will be retrieved from the API  */
  const employees: Employee[] = [
    createEmployee(
      "John",
      "Winchester",
      "john@the-winchesters.org",
      scrumMasterSkill,
      [reactSkill, javaSkill]
    ),
    createEmployee(
      "Dean",
      "Winchester",
      "dean@the-winchesters.org",
      reactSkill,
      [javaSkill]
    ),
    createEmployee(
      "Sam",
      "Winchester",
      "sammy@the-winchesters.org",
      javaSkill,
      [reactSkill]
    ),
  ];

  return (
    <DataTable<Employee>
      columns={columns}
      rows={employees}
      initialSortProperty="fullName"
    />
  );
};

export default EmployeesPage;
