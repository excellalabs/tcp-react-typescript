import { render, screen } from "@testing-library/react";
import React from "react";
import EmployeePage from "./Employee";

describe("Employee page", () => {
  beforeEach(() => {
    render(
        <EmployeePage />
    );
  });

  it("renders the employee page", () => {
    expect(screen.getByText(/Employee/)).toBeInTheDocument();
  });
});
