import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import BioForm from "./BioForm";
import { Formik } from "formik";
import {
  bioFormSchema,
  bioFormInitialValues,
  IEmployeeBioForm,
} from "./BioForm.schema";
import { ValidationError } from "yup";

describe("BioForm", () => {
  function mockSubmit(values: IEmployeeBioForm) {
    jest.fn;
  }

  beforeEach(() => {
    render(
      <Formik
        initialValues={bioFormInitialValues}
        validationSchema={bioFormSchema}
        onSubmit={mockSubmit}
      >
        {(formik) => (
          <form data-testid="form">
            <BioForm formGroup="bio" />;
          </form>
        )}
      </Formik>
    );
  });

  it("renders bio form fields", () => {
    expect(screen.getByLabelText("First name*")).toBeInTheDocument();
    expect(screen.getByLabelText("Middle Initial")).toBeInTheDocument();
    expect(screen.getByLabelText("Last name*")).toBeInTheDocument();
    expect(screen.getByText("Date of Birth*")).toBeInTheDocument();
    expect(screen.getByLabelText("FEMALE")).toBeInTheDocument();
    expect(screen.getByLabelText("MALE")).toBeInTheDocument();
    expect(screen.getByLabelText("OTHER")).toBeInTheDocument();
    expect(screen.getByText("Ethnicity*")).toBeInTheDocument();
    expect(screen.getByLabelText("US Citizen")).toBeInTheDocument();
  });

  // it("requires firstname", async () => {
  //   const invalidData = {
  //     firstName: "",
  //     middleInitial: "",
  //     lastName: "Brown",
  //     birthDate: new Date("12/12/1977"),
  //     gender: "MALE",
  //     ethnicicty: "BLACK",
  //     isCitizen: false,
  //   };
  //   await expect(bioFormSchema.validate(validBioValues).
  //   await expect(bioFormSchema.validateAt("firstName", invalidData)).rejects.toBeFalsy();
  //   await expect(
  //     bioFormSchema.validateAt("person.name", { firstName: "Thomas" })
  //   ).resolves.toBeTruthy();
  // });

  it("validates bio object with required fields", async () => {
    const testInfo = {
      firstName: "John",
      lastName: "Doe",
      birthDate: "03/17/1980",
      gender: "MALE",
      ethnicity: "ASIAN",
      isCitizen: true,
    };

    await expect(bioFormSchema.validate(testInfo)).resolves;
  });

  it("throws validation error when first name is missing", async () => {
    const testInfo = {
      firstName: "",
      lastName: "Doe",
      birthDate: "03/17/1980",
      gender: "MALE",
      ethnicity: "ASIAN",
      isCitizen: true,
    };

    expect.assertions(1);
    await expect(bioFormSchema.validate(testInfo)).rejects.toEqual(
      new ValidationError("First name is required", "", "")
    );
  });

  it("throws validation error when last name is missing", async () => {
    const testInfo = {
      firstName: "John",
      lastName: "",
      birthDate: "03/17/1980",
      gender: "MALE",
      ethnicity: "ASIAN",
      isCitizen: true,
    };

    expect.assertions(1);
    await expect(bioFormSchema.validate(testInfo)).rejects.toEqual(
      new ValidationError("Last name is required", "", "")
    );
  });

  // it("throws validation error when birthDate is missing", async () => {
  //   const testInfo = {
  //     firstName: "John",
  //     lastName: "Doe",
  //     birthDate: "",
  //     gender: "MALE",
  //     ethnicity: "ASIAN",
  //     isCitizen: true,
  //   };

  //   expect.assertions(1);
  //   await expect(bioFormSchema.validate(testInfo)).rejects.toEqual(
  //     new ValidationError("Date of birthis required", "", "")
  //   );
  // });

  it("throws validation error when gender is missing", async () => {
    const testInfo = {
      firstName: "John",
      lastName: "Doe",
      birthDate: "03/17/1980",
      gender: "",
      ethnicity: "ASIAN",
      isCitizen: true,
    };

    expect.assertions(1);
    await expect(bioFormSchema.validate(testInfo)).rejects.toEqual(
      new ValidationError("Gender is required", "", "")
    );
  });

  it("throws validation error when ethnicity is missing", async () => {
    const testInfo = {
      firstName: "John",
      lastName: "Doe",
      birthDate: "03/17/1980",
      gender: "MALE",
      ethnicity: "",
      isCitizen: true,
    };

    expect.assertions(1);
    await expect(bioFormSchema.validate(testInfo)).rejects.toEqual(
      new ValidationError("Ethnicity is required", "", "")
    );
  });
});
