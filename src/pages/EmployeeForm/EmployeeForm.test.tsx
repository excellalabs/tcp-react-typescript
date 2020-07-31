import { act, fireEvent, render, screen } from "@testing-library/react";

import EmployeeForm from "./EmployeeForm";
import React from "react";
import { defaultValues } from "./EmployeeForm.schema";

describe("EmployeeForm", () => {
  beforeEach(() => {
    render(<EmployeeForm employeeFormData={defaultValues} />);
  });

  it("renders four steps", () => {
    expect(screen.getByText("Biological Information")).toBeInTheDocument();
    expect(screen.getByText("Contact Info")).toBeInTheDocument();
    expect(screen.getByText("Skills")).toBeInTheDocument();
    expect(screen.getByText("Review")).toBeInTheDocument();
  });

  it("does not progress if bio form is not complete", async () => {
    const firstName = screen.getByLabelText(/First name*/) as HTMLInputElement;
    const lastName = screen.getByLabelText(/Last name*/) as HTMLInputElement;
    const gender = screen.getByLabelText(/gender/) as HTMLInputElement;
    const ethnicity = screen.getByLabelText(/Ethnicity*/) as HTMLElement;

    act(() => {
      fireEvent.change(firstName, { target: { value: "John" } });
      fireEvent.change(lastName, { target: { value: "Smith" } });
      fireEvent.change(gender, { target: { value: "Male" } });
      fireEvent.change(ethnicity, { target: { value: "Caucasian" } });
    });

    fireEvent.submit(screen.getByTestId("form"));

    expect(firstName).toBeInTheDocument();
  });

  it("progresses if required fields in bio form are complete", async () => {
    const firstName = screen.getByLabelText(/First name*/) as HTMLInputElement;
    const lastName = screen.getByLabelText(/Last name*/) as HTMLInputElement;
    const gender = screen.getByLabelText(/gender/) as HTMLInputElement;
    const ethnicity = screen.getByLabelText(/Ethnicity*/) as HTMLElement;

    act(() => {
      fireEvent.change(firstName, { target: { value: "John" } });
      fireEvent.change(lastName, { target: { value: "Smith" } });
      fireEvent.change(gender, { target: { value: "Male" } });
      fireEvent.change(ethnicity, { target: { value: "Caucasian" } });
    });

    fireEvent.submit(screen.getByTestId("form"));

    const email = await screen.findByLabelText(/Email*/);
    expect(email).toBeInTheDocument();
  });

  it("navigates from contact info to bio section by clicking bio heading", async () => {
    const firstName = screen.getByLabelText(/First name*/) as HTMLInputElement;
    const lastName = screen.getByLabelText(/Last name*/) as HTMLInputElement;
    const gender = screen.getByLabelText(/gender/) as HTMLInputElement;
    const ethnicity = screen.getByLabelText(/Ethnicity*/) as HTMLElement;

    act(() => {
      fireEvent.change(firstName, { target: { value: "John" } });
      fireEvent.change(lastName, { target: { value: "Smith" } });
      fireEvent.change(gender, { target: { value: "Male" } });
      fireEvent.change(ethnicity, { target: { value: "Caucasian" } });
    });

    fireEvent.submit(screen.getByTestId("form"));
    await screen.findByLabelText(/Email*/);
    fireEvent.click(
      screen.getByRole("button", { name: "Biological Information" })
    );

    expect(screen.getByLabelText(/First name*/)).toBeInTheDocument();
  });
});
