import { render, screen } from "@testing-library/react";
import React from "react";
import SkillsPage from "./Skills";

describe("Employees page", () => {
  beforeEach(() => {
    render(
        <SkillsPage />
    );
  });

  it("renders the skills page", () => {
    expect(screen.getByText(/Skills/)).toBeInTheDocument();
  });
});
