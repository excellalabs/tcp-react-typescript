import SkillTable from "./SkillTable";
import { ISkill } from "../../../models/Skill.interface";
import { fireEvent, render, screen } from "@testing-library/react";

import React from "react";
import { act } from "react-dom/test-utils";
import skills from "../../../mocks/data/skill";

describe("SkillTable page", () => {
  let editHandler: (id: number) => void;
  let deleteHandler: (id: number) => void;

  beforeEach(() => {
    editHandler = jest.fn((id: number) => {});
    deleteHandler = jest.fn((id: number) => {});

    render(
      <SkillTable
        skills={skills}
        editSkill={editHandler}
        deleteSkill={deleteHandler}
      />
    );
  });

  it("should fire a delete event with correct ID", async () => {
    // Arrange
    const deleteBtns = await screen.findAllByText("DELETE");
    const sortedSkills = skills.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    // Act
    act(() => {
      fireEvent(
        deleteBtns[0],
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
        })
      );
    });

    // Assert
    expect(deleteHandler).toHaveBeenCalled();
    expect(deleteHandler).toHaveBeenCalledTimes(1);
    expect(deleteHandler).toHaveBeenCalledWith(sortedSkills[0].id);
  });

  it("should fire a edit event with correct ID", async () => {
    // Arrange
    const editBtns = await screen.findAllByText("EDIT");
    const sortedSkills = skills.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    // Act
    act(() => {
      fireEvent(
        editBtns[0],
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
        })
      );
    });

    // Assert
    expect(editHandler).toHaveBeenCalled();
    expect(editHandler).toHaveBeenCalledTimes(1);
    expect(editHandler).toHaveBeenCalledWith(sortedSkills[0].id);
  });
});
