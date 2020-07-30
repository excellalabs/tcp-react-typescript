import { ICategory, IEmployeeSkill, ISkill, PROFICIENCY } from "../../models/Skill.interface";
import { IEmployee, IEmployeeBio, IEmployeeContact } from "../../models/Employee.interface";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, makeStyles } from "@material-ui/core";

import { ChipList } from "../../components/ChipList/ChipList";
import React from "react";

/*  BEGIN TEMPORARY CODE THAT WILL BE REMOVED LATER   */

const agileSkillCategory: ICategory = {id: 0, name: 'Agile' }
const techSkillCategory: ICategory = {id: 1,  name: 'Technology' }
const scrumMasterSkill: ISkill = { id: 0,  name: 'Scrum Master', category: agileSkillCategory }
const reactSkill: ISkill = { id: 1,  name: 'React', category: techSkillCategory }
const javaSkill: ISkill = { id: 2,  name: 'Java', category: techSkillCategory }


function createEmployee(firstName: string, lastName: string, email: string, primarySkill: ISkill, otherSkills: ISkill[]): IEmployee {
  return {
    bio: {
      firstName,
      lastName
    } as IEmployeeBio,
    contact: {
      email
    } as IEmployeeContact,
    skills: [{ skill: primarySkill, proficiency: PROFICIENCY.HIGH, primary: true}, ...otherSkills.map(s => ({ skill: s, proficiency: PROFICIENCY.MID, primary: false}))] as IEmployeeSkill[]
  } as IEmployee
}

/*  END TEMPORARY CODE THAT WILL BE REMOVED LATER   */

// No idea if we want this or not, but it's included in the code sample from Material-UI, so leaving it in for now.
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const EmployeesPage: React.FC<{}> = () => {

  /*  Later, this will be retrieved from the API  */
  const employees: IEmployee[] = [
    createEmployee('John', 'Winchester', 'john@the-winchesters.org', scrumMasterSkill, [reactSkill, javaSkill]),
    createEmployee('Dean', 'Winchester', 'dean@the-winchesters.org', reactSkill, [javaSkill]),
    createEmployee('Sam', 'Winchester', 'sammy@the-winchesters.org', javaSkill, [reactSkill])
  ]

  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Employee</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Skills</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((e: IEmployee) => (
            <TableRow key={`${e.bio.firstName}${e.bio.lastName}`}>
              <TableCell component="th" scope="row">
                {`${e.bio.firstName} ${e.bio.lastName}`}
              </TableCell>
              <TableCell>{e.contact.email}</TableCell>
              <TableCell>
                <ChipList skills={e.skills}></ChipList>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployeesPage;
