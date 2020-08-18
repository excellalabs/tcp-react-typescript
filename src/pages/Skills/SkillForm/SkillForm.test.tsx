import { render, screen } from "@testing-library/react";

import SkillForm from "./SkillForm";
import { ISkill } from "../../../models/Skill.interface";
import React from "react";

describe("SkillForm page", () => {
  const mockSubmitHandler = jest.fn((category: ISkill) => {});
  beforeEach(() => {
    render(<SkillForm submitSkill={mockSubmitHandler} />);
  });

  it("renders the Skill Form input Label", () => {
    expect(screen.getByText(/Skill Name/)).toBeInTheDocument();
  });

  it("renders the Skill Form input", () => {
    expect(screen.getByLabelText(/Skill Name/)).toBeInTheDocument();
  });

  it("renders the Skill Form submit button", () => {
    expect(screen.getByText(/Add Skill/)).toBeInTheDocument();
  });
});
