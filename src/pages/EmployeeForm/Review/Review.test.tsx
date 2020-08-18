import React from "react";
import { render, screen } from "@testing-library/react";
import Review from "./Review";
import { Formik, Form } from "formik";
import { defaultValues } from "../EmployeeForm.schema";

describe("Review Page", () => {
  beforeEach(() => {
    render(
      <Formik initialValues={defaultValues} onSubmit={jest.fn()}>
        <Form>
          <Review />
        </Form>
      </Formik>
    );
  });

  it("renders the review page", () => {
    expect(screen.getByText(/Biographical Information/)).toBeInTheDocument();
  });
});
