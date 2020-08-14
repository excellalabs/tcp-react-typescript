import EmployeesPage, { doSearchAndFilter } from "./Employees";
import { javaSkill, scrumMasterSkill } from "../../__mocks__/data/skill";
import { render, screen } from "@testing-library/react";

import { AuthProvider } from "../../context/AuthContext/AuthContext";
import React from "react";
import { employees } from "../../__mocks__/data/employee";

describe("Employees page", () => {
  beforeEach(() => {
    render(
      <AuthProvider>
        <EmployeesPage />
      </AuthProvider>
    );
  });

  it("renders the employees table", () => {
    // Look for Table Column Headers
    expect(screen.getByText("Employee Name")).toBeInTheDocument();
    expect(screen.getByText("Employee Email")).toBeInTheDocument();
    expect(screen.getByText("Skills")).toBeInTheDocument();
  });
});

describe("doSearchAndFilter", () => {
  // Default behavior
  it("should return the original list when searchText and filters are both empty", () => {
    expect(doSearchAndFilter(employees, "", [])).toEqual(employees);
  });

  // SEARCH
  it("should search by first name", () => {
    const results = doSearchAndFilter(employees, employees[0].firstName, []);
    expect(results).toEqual(
      employees.filter((e) => e.firstName === employees[0].firstName)
    );
    expect(results.length).toBe(1); // Only John
  });
  it("should search by last name", () => {
    const results = doSearchAndFilter(employees, employees[0].lastName, []);
    expect(results).toEqual(
      employees.filter((e) => e.lastName === employees[0].lastName)
    );
    expect(results.length).toBe(3); // John, Dean, and Sam
  });
  it("should search without case sensitivity", () => {
    expect(
      doSearchAndFilter(employees, employees[0].firstName.toUpperCase(), [])
    ).toEqual(employees.filter((e) => e.firstName === employees[0].firstName));
    expect(
      doSearchAndFilter(employees, employees[0].firstName.toLowerCase(), [])
    ).toEqual(employees.filter((e) => e.firstName === employees[0].firstName));
  });

  // FILTER
  it("should filter by skill", () => {
    expect(doSearchAndFilter(employees, "", [scrumMasterSkill.name])).toEqual(
      employees.filter((e) =>
        e.skills.some((s) => s.skill.name === scrumMasterSkill.name)
      )
    );
  });
  it("should filter by multiple skills", () => {
    expect(
      doSearchAndFilter(employees, "", [scrumMasterSkill.name, javaSkill.name])
    ).toEqual(
      employees
        .filter((e) =>
          e.skills.some((s) => s.skill.name === scrumMasterSkill.name)
        )
        .filter((e) => e.skills.some((s) => s.skill.name === javaSkill.name))
    );
  });

  // SEARCH AND FILTER
  it("should search AND filter", () => {
    expect(
      doSearchAndFilter(employees, employees[0].lastName, [
        scrumMasterSkill.name,
      ])
    ).toEqual([employees[0]]); // Only "Winchester" with the ScrumMaster skill
  });
});
