import React from "react";
import { render, screen } from "@testing-library/react";
import EmployeeForm from "./EmployeeForm";

describe("EmployeeForm", () => {
  beforeEach(() => {
    render(<EmployeeForm />);
  });

  it("renders four steps", () => {
    expect(screen.getByText("Biological Information")).toBeInTheDocument();
    expect(screen.getByText("Contact Info")).toBeInTheDocument();
    expect(screen.getByText("Skills")).toBeInTheDocument();
    expect(screen.getByText("Review")).toBeInTheDocument();
  });
});
