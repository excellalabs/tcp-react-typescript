import { render, screen } from "@testing-library/react";
import React from "react";
import EmployeesPage from "./Employees";

describe("Employees page", () => {
  beforeEach(() => {
    render(
        <EmployeesPage />
    );
  });

  it("renders the employees page", () => {
    expect(screen.getByText(/Employees/)).toBeInTheDocument();
  });
});
