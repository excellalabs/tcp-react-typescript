import { render, screen } from "@testing-library/react";
import React from "react";
import SkillsPage from "./Skills";

describe("Skills page", () => {
  beforeEach(() => {
    render(<SkillsPage />);
  });

  it("renders the Skills Form page", () => {
    expect(screen.getByLabelText(/Skill Name/)).toBeInTheDocument();
  });

  it("renders the Skill Table page", () => {
    expect(screen.getByText(/Skill Category/)).toBeInTheDocument();
  });
});