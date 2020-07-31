/*  BEGIN TEMPORARY CODE THAT WILL BE REMOVED LATER   */

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
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  primarySkill: ISkill,
  otherSkills: ISkill[]
): Employee {
  return new Employee({
    id: id,
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

export const employees: Employee[] = [
  createEmployee(
    1,
    "John",
    "Winchester",
    "john@the-winchesters.org",
    scrumMasterSkill,
    [reactSkill, javaSkill]
  ),
  createEmployee(
    2,
    "Dean",
    "Winchester",
    "dean@the-winchesters.org",
    reactSkill,
    [javaSkill]
  ),
  createEmployee(
    3,
    "Sam",
    "Winchester",
    "sammy@the-winchesters.org",
    javaSkill,
    [reactSkill]
  ),
  createEmployee(
    4,
    "Abraham",
    "Lincoln",
    "honest-abe@presidents.gov",
    reactSkill,
    [scrumMasterSkill, javaSkill]
  ),
  createEmployee(
    5,
    "Theodore",
    "Rosevelt",
    "teddy@presidents.gov",
    reactSkill,
    [javaSkill, scrumMasterSkill]
  ),
  createEmployee(
    6,
    "George",
    "Washington",
    "No1@presidents.gov",
    scrumMasterSkill,
    [reactSkill, javaSkill]
  ),
];
