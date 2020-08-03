import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import BioForm from "./BioForm";
import { Formik } from "formik";
import {
  bioFormSchema,
  bioFormInitialValues,
  IEmployeeBioForm,
} from "./BioForm.schema";

describe("BioForm", () => {
  function mockSubmit(values: IEmployeeBioForm) {
    console.log("MADE IT");
    jest.fn;
  }

  const bioForm = (
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

  it("renders bio form fields", () => {
    render(bioForm);
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

  it("has validation error for first name not being present", async () => {
    const { container } = render(bioForm);
    const lastName = screen.getByLabelText(/Last name*/) as HTMLInputElement;
    const gender = screen.getByRole("radio", {
      name: "FEMALE",
    }) as HTMLElement;

    act(() => {
      fireEvent.click(lastName);
      fireEvent.change(lastName, { target: { value: "Doe" } });
    });

    fireEvent.submit(screen.getByTestId("form"));

    expect(screen.getByText("required")).toBeInTheDocument();
  });
});
