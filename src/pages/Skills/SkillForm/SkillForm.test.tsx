import React from "react";
import SkillForm from "./SkillForm";
import { ISkill } from "../../../models/Skill.interface";
import { AuthProvider } from "../../../context/AuthContext/AuthContext";
import { render, screen, act, fireEvent } from "@testing-library/react";

let container: HTMLElement;
describe("SkillForm page", () => {
  const mockSubmitHandler = jest.fn((category: ISkill) => {});
  beforeEach(() => {
    const { container: c } = render(
      <AuthProvider>
        <SkillForm submitSkill={mockSubmitHandler} />
      </AuthProvider>
    );
    container = c;
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

  it("clears the category form on submit", () => {
    // Arrange
    const skillName = screen.getByLabelText(/Skill Name/) as HTMLInputElement;
    // TODO: wire in mock dropdown items.
    const category = container.querySelector(
      '[class="MuiSelect-nativeInput"]'
    ) as HTMLInputElement;
    const addButton = screen.getByText(/Add Skill/) as HTMLInputElement;
    // Act
    act(() => {
      fireEvent.change(skillName, { target: { value: "Test Skill" } });
      fireEvent.change(category, { target: { value: "Agile" } });
      fireEvent.click(addButton);
    });
    // Assert
    expect(skillName.value).toBe("");
    // TODO: wire in mock dropdown items.
    // expect(category).toBe("");
  });
});
