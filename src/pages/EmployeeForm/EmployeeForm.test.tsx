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
    const initialValues = {
      firstName: "",
      middleInitial: "",
      lastName: "",
      dob: "",
      gender: "",
      ethnicity: "",
      isCitizen: "",
    };

    const wrapper = render(<EmployeeForm />);

    const firstName = wrapper.getByLabelText(/First name*/) as HTMLInputElement;
    const middleInitial = wrapper.getByLabelText(
      /Middle Initial/
    ) as HTMLInputElement;
    const lastName = wrapper.getByLabelText(/Last name*/) as HTMLInputElement;
    const dob = wrapper.getByLabelText(/Date of Birth*/) as HTMLInputElement;
    const gender = wrapper.getByLabelText(/gender/) as HTMLInputElement;
    const ethnicity = wrapper.getByLabelText(/Ethnicity*/) as HTMLInputElement;
    const isCitizen = wrapper.getByLabelText(/US Citizen/) as HTMLInputElement;
    const submitButton = wrapper.getByRole("button", {
      name: "Biological Information Button",
      hidden: false,
    }) as HTMLInputElement;

    await act(async () => {
      fireEvent.change(firstName, { target: { value: "John" } });
      fireEvent.change(middleInitial, { target: { value: "L" } });
      fireEvent.change(lastName, { target: { value: "Smith" } });

      fireEvent.click(submitButton);
    });

    expect(screen.getByText("Date of Birth is required"));
  });
});
