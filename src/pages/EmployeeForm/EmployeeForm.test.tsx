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
    const gender = screen.getByRole("radio", {
      name: "FEMALE",
    }) as HTMLElement;

    act(() => {
      fireEvent.change(firstName, { target: { value: "Jane" } });
      fireEvent.change(lastName, { target: { value: "Doe" } });
      fireEvent.click(gender);
    });

    fireEvent.submit(screen.getByTestId("form"));

    expect(firstName).toBeInTheDocument();
  });

  it("progresses if required fields in bio form are complete", async () => {
    const firstName = screen.getByLabelText(/First name*/) as HTMLInputElement;
    const lastName = screen.getByLabelText(/Last name*/) as HTMLInputElement;
    const birthDate = screen.getByRole("textbox", {
      name: "",
    }) as HTMLInputElement;
    const gender = screen.getByRole("radio", {
      name: "FEMALE",
    }) as HTMLInputElement;
    const ethnicity = screen.getByTestId("bio.ethnicity");

    act(() => {
      fireEvent.change(firstName, { target: { value: "Jane" } });
      fireEvent.change(lastName, { target: { value: "Doe" } });
      fireEvent.change(birthDate, { target: { value: "01/01/1990" } });
      fireEvent.click(gender);
      fireEvent.change(ethnicity., { target: { value: "CAUCASIAN" } });
    });

    fireEvent.submit(screen.getByTestId("form"));

    const email = await screen.findByLabelText(/Email*/);
    expect(email).toBeInTheDocument();
  });

  it("navigates from contact info to bio section by clicking bio heading", async () => {
    const firstName = screen.getByLabelText(/First name*/) as HTMLInputElement;
    const lastName = screen.getByLabelText(/Last name*/) as HTMLInputElement;
    const birthDate = screen.getByRole("textbox", {
      name: "",
    }) as HTMLInputElement;
    const gender = screen.getByRole("radio", {
      name: "FEMALE",
    }) as HTMLInputElement;
    const ethnicity = screen.getByRole("button", {
      name: "",
    }) as HTMLElement;

    act(() => {
      fireEvent.change(firstName, { target: { value: "Jane" } });
      fireEvent.change(lastName, { target: { value: "Doe" } });
      fireEvent.change(birthDate, { target: { value: "01/01/1990" } });
      fireEvent.click(gender);
      fireEvent.change(ethnicity, { target: { value: "BLACK" } });
    });

    fireEvent.submit(screen.getByTestId("form"));
    await screen.findByLabelText(/Email*/);
    fireEvent.click(
      screen.getByRole("button", { name: "Biological Information" })
    );

    expect(screen.getByLabelText(/First name*/)).toBeInTheDocument();
  });
});
