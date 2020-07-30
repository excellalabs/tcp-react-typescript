import {
  act,
  fireEvent,
  render,
  screen,
  wait,
  waitForElementToBeRemoved,
} from "@testing-library/react";

import EmployeeForm from "./EmployeeForm";
import React from "react";

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
      fireEvent.click(submitButton);
    });

    wait(() => {
      expect(screen.getByLabelText(/First name*/)).toBeInTheDocument();
    });
  });

  //    #############################################################
  // GENDER and RACE are missing for REQUIRED fields that will progress the form forward
  //    #############################################################
  it("progresses if required fields in bio form are complete", async () => {
    const firstName = screen.getByLabelText(/First name*/) as HTMLInputElement;
    const lastName = screen.getByLabelText(/Last name*/) as HTMLInputElement;
    const submitButton = screen.getByText("Next") as HTMLInputElement;

    // await act(async () => {
    fireEvent.change(firstName, { target: { value: "John" } });
    fireEvent.change(lastName, { target: { value: "Smith" } });
    fireEvent.click(submitButton);
    // });

    // wait(() => {
    await waitForElementToBeRemoved<HTMLInputElement>(() => firstName);

    expect(screen.getByLabelText(/First name*/)).not.toBeInTheDocument();

    // });
  });

  it("navigates from contact info to bio section by clicking bio heading", async () => {
    const firstName = screen.getByLabelText(/First name*/) as HTMLInputElement;
    const lastName = screen.getByLabelText(/Last name*/) as HTMLInputElement;
    const submitButton = screen.getByText("Next") as HTMLInputElement;

    await act(async () => {
      fireEvent.change(firstName, { target: { value: "John" } });
      fireEvent.change(lastName, { target: { value: "Smith" } });
      fireEvent.click(submitButton);
      fireEvent.click(
        screen.getByRole("button", { name: "Biological Information" })
      );
    });

    wait(() => {
      expect(screen.getByLabelText(/First name*/)).toBeInTheDocument();
    });
  });
});
