import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import EmployeeForm from "./EmployeeForm";

describe("EmployeeForm", () => {
  beforeEach(() => {
    render(<EmployeeForm />);
  });

  it("renders four steps", () => {
    expect(screen.getByText("Biological Information")).toBeInTheDocument();
    expect(screen.getByText("Contact Info")).toBeInTheDocument();
    expect(screen.getByText("Skills")).toBeInTheDocument();
    expect(screen.getByText("Review")).toBeInTheDocument();
  });

  it("does not progress if bio form is not complete", async () => {
    const firstName = screen.getByLabelText(/First name*/) as HTMLInputElement;
    const middleInitial = screen.getByLabelText(
      /Middle Initial/
    ) as HTMLInputElement;
    const lastName = screen.getByLabelText(/Last name*/) as HTMLInputElement;
    const submitButton = screen.getByText("Next") as HTMLInputElement;

    await act(async () => {
      fireEvent.change(firstName, { target: { value: "John" } });
      fireEvent.change(middleInitial, { target: { value: "L" } });
      fireEvent.change(lastName, { target: { value: "Smith" } });
      fireEvent.click(submitButton);
    });

    expect(screen.getByLabelText(/First name*/)).toBeInTheDocument();
    expect(
      screen.getByTestId("Biological Information-content")
    ).toBeInTheDocument();
  });

  it("progresses if required fields in bio form are complete", async () => {
    const firstName = screen.getByLabelText(/First name*/) as HTMLInputElement;
    const middleInitial = screen.getByLabelText(
      /Middle Initial/
    ) as HTMLInputElement;
    const lastName = screen.getByLabelText(/Last name*/) as HTMLInputElement;
    const dob = screen.getByLabelText(/Date of Birth*/) as HTMLInputElement;
    const ethnicity = screen.getByLabelText(/Ethnicity*/) as HTMLInputElement;
    const submitButton = screen.getByText("Next") as HTMLInputElement;

    await act(async () => {
      fireEvent.change(firstName, { target: { value: "John" } });
      fireEvent.change(middleInitial, { target: { value: "L" } });
      fireEvent.change(lastName, { target: { value: "Smith" } });
      fireEvent.change(dob, { target: { value: "09/27/1990" } });
      fireEvent.change(ethnicity, { target: { value: "White" } });
      fireEvent.click(submitButton);
    });

    expect(
      screen.getByTestId("Biological Information-content")
    ).toBeInTheDocument();
  });

  it("navigates from contact info to bio section by clicking bio heading", async () => {
    const firstName = screen.getByLabelText(/First name*/) as HTMLInputElement;
    const middleInitial = screen.getByLabelText(
      /Middle Initial/
    ) as HTMLInputElement;
    const lastName = screen.getByLabelText(/Last name*/) as HTMLInputElement;
    const dob = screen.getByLabelText(/Date of Birth*/) as HTMLInputElement;
    const ethnicity = screen.getByLabelText(/Ethnicity*/) as HTMLInputElement;
    const submitButton = screen.getByText("Next") as HTMLInputElement;

    await act(async () => {
      fireEvent.change(firstName, { target: { value: "John" } });
      fireEvent.change(middleInitial, { target: { value: "L" } });
      fireEvent.change(lastName, { target: { value: "Smith" } });
      fireEvent.change(dob, { target: { value: "09/27/1990" } });
      fireEvent.change(ethnicity, { target: { value: "White" } });
      fireEvent.click(submitButton);
      fireEvent.click(screen.getByTestId("Biological Information-button"));
    });

    expect(
      screen.getByTestId("Biological Information-content")
    ).toBeInTheDocument();
  });
});
