import React from "react";
import {
  render,
  screen,
  fireEvent,
  act,
  getByRole,
  getByText,
  getByTestId,
  wait,
} from "@testing-library/react";
import BioForm from "./ContactForm";
import { initialValues } from "./ContactForm.schema";

describe("BioForm", () => {
  function handleSubmit() {
    render(<h1>complete</h1>);
  }

  beforeEach(() => {
    render(
      <BioForm
        formValues={initialValues}
        handleFormChange={jest.fn}
        handleNext={jest.fn}
        handleBack={jest.fn}
      />
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

  it("has validation error for first name not being present", async () => {
    const firstName = screen.getByLabelText(/First name*/) as HTMLInputElement;
    const submitButton = screen.getByText("Next") as HTMLInputElement;

    await act(async () => {
      fireEvent.change(firstName, { target: { value: "09/27/1990" } });
    });

    // await act(async () => {
    fireEvent.click(submitButton);
    // });

    await wait(() => {
      expect(
        screen.queryByText("First name is required")
      ).not.toBeInTheDocument();
      expect(screen.getByText("Last name is required")).toBeInTheDocument();
      expect(screen.getByText("Monkey")).toBeInTheDocument();
    });
  });
});
