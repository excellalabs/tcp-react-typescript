import {
  IEmployeeSkillForm,
  skillsFormInitialValues,
  skillsFormSchema,
} from "./SkillsForm.schema";
import { render, screen } from "@testing-library/react";

import { Formik } from "formik";
import { PROFICIENCY } from "../../../models/Skill.interface";
import React from "react";
import SkillsForm from "./SkillsForm";
import { ValidationError } from "yup";

describe("SkillsForm", () => {
  function mockSubmit(values: IEmployeeSkillForm) {
    jest.fn();
  }

  beforeEach(() => {
    render(
      <Formik
        initialValues={skillsFormInitialValues}
        validationSchema={skillsFormSchema}
        onSubmit={mockSubmit}
      >
        {(formik) => (
          <form data-testid="form">
            <SkillsForm formGroup="" />;
          </form>
        )}
      </Formik>
    );
  });

  it("renders skills form fields", () => {
    expect(screen.getByLabelText("Skill*")).toBeInTheDocument();
    expect(screen.getByText("Proficiency*")).toBeInTheDocument();
    expect(screen.getByText("Primary Skill")).toBeInTheDocument();
  });

  it("validates contact object with required fields", async () => {
    const testInfo = [
      {
        skill: "test skill",
        proficiency: PROFICIENCY.HIGH,
        primary: false,
      },
    ];

    await expect(skillsFormSchema.validate(testInfo)).resolves;
  });

  it("throws validation error when skill is missing", async () => {
    const testInfo = [
      {
        skill: "",
        proficiency: PROFICIENCY.HIGH,
        primary: false,
      },
    ];

    expect.assertions(1);
    await expect(skillsFormSchema.validate(testInfo)).rejects.toEqual(
      new ValidationError("Skill is required", "", "")
    );
  });

  it("throws validation error when proficiency is missing", async () => {
    const testInfo = [
      {
        skill: "test skill",
        proficiency: "",
        primary: false,
      },
    ];

    expect.assertions(1);
    await expect(skillsFormSchema.validate(testInfo)).rejects.toEqual(
      new ValidationError("Proficiency is required", "", "")
    );
  });

  it("validates multiple skill objects", async () => {
    const testInfo = [
      {
        skill: "test skill",
        proficiency: PROFICIENCY.HIGH,
        primary: false,
      },
      {
        skill: "test skill 2",
        proficiency: PROFICIENCY.MID,
        primary: true,
      },
    ];

    await expect(skillsFormSchema.validate(testInfo)).resolves;
  });

  it("throws validation error when second skill is missing", async () => {
    const testInfo = [
      {
        skill: "test skill",
        proficiency: PROFICIENCY.MID,
        primary: false,
      },
      {
        skill: "",
        proficiency: PROFICIENCY.HIGH,
        primary: false,
      },
    ];

    expect.assertions(1);
    await expect(skillsFormSchema.validate(testInfo)).rejects.toEqual(
      new ValidationError("Skill is required", "", "")
    );
  });
});
