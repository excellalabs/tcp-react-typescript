import {
  ETHNICITY,
  Employee,
  GENDER,
  IEmployee,
  IEmployeeBio,
  IEmployeeContact,
} from '../../models/Employee.interface'
import {
  IEmployeeSkill,
  ISkill,
  PROFICIENCY,
} from '../../models/Skill.interface'
import { javaSkill, reactSkill, scrumMasterSkill } from './skill'

export const employee = {
  bio: {
    firstName: '',
    lastName: '',
    middleInitial: '',
    birthDate: new Date(),
    gender: GENDER.MALE,
    ethnicity: ETHNICITY.AMERICAN_INDIAN,
    usCitizen: true,
  },
  contact: {
    email: 'a',
    phoneNumber: '',
    address: {
      line1: '',
      line2: '',
      zipCode: '',
      city: '',
      stateCode: '',
    },
  },
  skills: [
    {
      id: 2,
      skill: { id: 2, name: '', category: { name: '', id: 1 } },
      proficiency: PROFICIENCY.LOW,
      primary: true,
    },
  ],
  id: 1,
}

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
  } as IEmployee)
}

export const employees: Employee[] = [
  createEmployee(
    1,
    'John',
    'Winchester',
    'john@the-winchesters.org',
    scrumMasterSkill,
    [reactSkill, javaSkill]
  ),
  createEmployee(
    2,
    'Dean',
    'Winchester',
    'dean@the-winchesters.org',
    reactSkill,
    [javaSkill]
  ),
  createEmployee(
    3,
    'Sam',
    'Winchester',
    'sammy@the-winchesters.org',
    javaSkill,
    [reactSkill]
  ),
  createEmployee(
    4,
    'Abraham',
    'Lincoln',
    'honest-abe@presidents.gov',
    reactSkill,
    [scrumMasterSkill, javaSkill]
  ),
  createEmployee(
    5,
    'Theodore',
    'Rosevelt',
    'teddy@presidents.gov',
    reactSkill,
    [javaSkill, scrumMasterSkill]
  ),
  createEmployee(
    6,
    'George',
    'Washington',
    'No1@presidents.gov',
    scrumMasterSkill,
    [reactSkill, javaSkill]
  ),
]

export default employee
