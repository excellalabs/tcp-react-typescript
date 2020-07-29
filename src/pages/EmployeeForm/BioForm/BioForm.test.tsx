import React from "react";
import {
  render,
  screen,
  fireEvent,
  act,
  getByRole,
  getByText,
  getByTestId,
} from "@testing-library/react";
import BioForm from "./BioForm";
import BioFormSchema from "./BioForm.schema";
import { EmployeeFormModel } from "../EmployeeFormModel";
import FormInitialValues from "../FormInitialValues";
import { Formik, Form } from "formik";
import { initial, first } from "lodash";

describe("BioForm", () => {
  const initialFormValues = { FormInitialValues };
  const validation = { BioFormSchema };
  const formField = { EmployeeFormModel };
  function handleSubmit() {
    render(<h1>complete</h1>);
  }

  beforeEach(() => {
    render(
      <Formik
        initialValues={initialFormValues}
        validationSchema={validation}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form data-testid="form" onSubmit={handleSubmit}>
            <BioForm formField={formField.EmployeeFormModel.formField} />
          </Form>
        )}
      </Formik>
    );
  });

  it("renders bio form fields", () => {
    expect(screen.getByLabelText("First name*")).toBeInTheDocument();
    expect(screen.getByLabelText("Middle Initial")).toBeInTheDocument();
    expect(screen.getByLabelText("Last name*")).toBeInTheDocument();
    expect(screen.getByText("Date of Birth*")).toBeInTheDocument();
    expect(screen.getByLabelText("Female")).toBeInTheDocument();
    expect(screen.getByLabelText("Male")).toBeInTheDocument();
    expect(screen.getByLabelText("Other")).toBeInTheDocument();
    expect(screen.getByText("Ethnicity*")).toBeInTheDocument();
    expect(screen.getByLabelText("US Citizen")).toBeInTheDocument();
  });

  it("has validation error for first name not being present", async () => {
    const firstName = screen.getByLabelText(/First name*/) as HTMLInputElement;
    const middleInitial = screen.getByLabelText(
      /Middle Initial/
    ) as HTMLInputElement;
    const dob = screen.getByRole("textbox", {
      name: "",
    }) as HTMLInputElement;

    await act(async () => {
      // fireEvent.select(firstName);
      fireEvent.click(dob);
      fireEvent.change(firstName, { target: { value: "09/27/1990" } });
      fireEvent.change(dob, { target: { value: "09/27/1990" } });
    });

    await act(async () => {
      fireEvent.click(middleInitial);
      // fireEvent.select(middleInitial);
    });
    await act(async () => {
      expect(screen.getByText("18")).toBeInTheDocument();
    });
  });
});
