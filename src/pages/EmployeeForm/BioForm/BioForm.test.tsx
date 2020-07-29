import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import BioForm from "./BioForm";
import BioFormSchema from "./BioForm.schema";
import { EmployeeFormModel } from "../EmployeeFormModel";
import FormInitialValues from "../FormInitialValues";
import { Formik, Form } from "formik";
import { initial } from "lodash";

describe("BioForm", () => {
  const initialFormValues = { FormInitialValues };
  const validation = { BioFormSchema };
  const formField = { EmployeeFormModel };
  beforeEach(() => {
    render(
      <Formik
        initialValues={initialFormValues}
        validationSchema={validation}
        onSubmit={() => console.log("submit")}
      >
        {(formik) => (
          <Form>
            <BioForm formField={formField} />
          </Form>
        )}
      </Formik>
    );
  });

  it("renders bio form fields", () => {
    const initialValues = FormInitialValues;
    console.log(screen);
    expect(screen.getByLabelText("First name*")).toBeInTheDocument();
    expect(screen.getByLabelText("Middle Initial")).toBeInTheDocument();
    expect(screen.getByLabelText("Last name")).toBeInTheDocument();
    expect(screen.getByLabelText("Date of Birth*")).toBeInTheDocument();
    expect(screen.getByLabelText("Female")).toBeInTheDocument();
    expect(screen.getByLabelText("Male")).toBeInTheDocument();
    expect(screen.getByLabelText("Other")).toBeInTheDocument();
    expect(screen.getByLabelText("Ethnicity*")).toBeInTheDocument();
    expect(screen.getByLabelText("US Citizen")).toBeInTheDocument();
  });
});
