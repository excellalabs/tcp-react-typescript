import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";

import EmployeeForm from "./EmployeeForm";
import React from "react";
import { defaultValues } from "./EmployeeForm.schema";

describe("EmployeeForm", () => {
  it("renders four steps", () => {
    render(<EmployeeForm employeeFormData={defaultValues} />);
    expect(screen.getByText("Biological Information")).toBeInTheDocument();
    expect(screen.getByText("Contact Info")).toBeInTheDocument();
    expect(screen.getByText("Skills")).toBeInTheDocument();
    expect(screen.getByText("Review")).toBeInTheDocument();
  });

  it("does not progress if bio form is not complete", async () => {
    render(<EmployeeForm employeeFormData={defaultValues} />);
    const firstName = screen.getByLabelText(/First name*/) as HTMLInputElement;
    const lastName = screen.getByLabelText(/Last name*/) as HTMLInputElement;
    const gender = screen.getByRole("radio", {
      name: "Female",
    }) as HTMLElement;

    act(() => {
      fireEvent.change(firstName, { target: { value: "Jane" } });
      fireEvent.change(lastName, { target: { value: "Doe" } });
      fireEvent.click(gender);
    });

    fireEvent.submit(screen.getByTestId("0-form"));

    expect(firstName).toBeInTheDocument();
  });

  it("progresses if required fields in bio form are complete", async () => {
    const { container } = render(
      <EmployeeForm employeeFormData={defaultValues} />
    );
    const firstName = screen.getByLabelText(/First name*/) as HTMLInputElement;
    const lastName = screen.getByLabelText(/Last name*/) as HTMLInputElement;
    const birthDate = screen.getByRole("textbox", {
      name: "",
    }) as HTMLInputElement;
    const gender = screen.getByRole("radio", {
      name: "Female",
    }) as HTMLInputElement;
    const ethnicity = container.querySelector(
      '[class="MuiSelect-nativeInput"]'
    ) as HTMLInputElement;

    act(() => {
      fireEvent.change(firstName, { target: { value: "Jane" } });
      fireEvent.change(lastName, { target: { value: "Doe" } });
      fireEvent.change(birthDate, { target: { value: "01/01/1990" } });
      fireEvent.click(gender);
      fireEvent.change(ethnicity, { target: { value: "CAUCASIAN" } });
    });

    fireEvent.submit(screen.getByTestId("0-form"));

    await waitFor(() => {
      expect(screen.getByText(/Address/)).toBeInTheDocument();
    });
  });

  it("navigates from contact info to bio section by clicking bio heading", async () => {
    const { container } = render(
      <EmployeeForm employeeFormData={defaultValues} />
    );
    const firstName = screen.getByLabelText(/First name*/) as HTMLInputElement;
    const lastName = screen.getByLabelText(/Last name*/) as HTMLInputElement;
    const birthDate = screen.getByRole("textbox", {
      name: "",
    }) as HTMLInputElement;
    const gender = screen.getByRole("radio", {
      name: "Female",
    }) as HTMLInputElement;
    const ethnicity = container.querySelector(
      '[class="MuiSelect-nativeInput"]'
    ) as HTMLInputElement;

    act(() => {
      fireEvent.change(firstName, { target: { value: "Jane" } });
      fireEvent.change(lastName, { target: { value: "Doe" } });
      fireEvent.change(birthDate, { target: { value: "01/01/1990" } });
      fireEvent.click(gender);
      fireEvent.change(ethnicity, { target: { value: "BLACK" } });
    });

    fireEvent.submit(screen.getByTestId("0-form"));
    await screen.findByLabelText(/Email*/);
    fireEvent.click(
      screen.getByRole("button", { name: "Biological Information" })
    );

    expect(screen.getByLabelText(/First name*/)).toBeInTheDocument();
  });

  it("does not progress if contact form is not complete", async () => {
    const { container } = render(
      <EmployeeForm employeeFormData={defaultValues} />
    );
    const firstName = screen.getByLabelText(/First name*/) as HTMLInputElement;
    const lastName = screen.getByLabelText(/Last name*/) as HTMLInputElement;
    const birthDate = screen.getByRole("textbox", {
      name: "",
    }) as HTMLInputElement;
    const gender = screen.getByRole("radio", {
      name: "Female",
    }) as HTMLInputElement;
    const ethnicity = container.querySelector(
      '[class="MuiSelect-nativeInput"]'
    ) as HTMLInputElement;

    act(() => {
      fireEvent.change(firstName, { target: { value: "Jane" } });
      fireEvent.change(lastName, { target: { value: "Doe" } });
      fireEvent.change(birthDate, { target: { value: "01/01/1990" } });
      fireEvent.click(gender);
      fireEvent.change(ethnicity, { target: { value: "CAUCASIAN" } });
    });

    fireEvent.submit(screen.getByTestId("0-form"));

    await screen.findByLabelText(/Email*/);
    const address = screen.getByLabelText(/Address*/) as HTMLInputElement;
    const city = screen.getByLabelText(/City*/) as HTMLInputElement;

    act(() => {
      fireEvent.change(address, { target: { value: "111 Forest Ave" } });
      fireEvent.change(city, { target: { value: "Hanover" } });
    });

    fireEvent.submit(screen.getByTestId("1-form"));

    expect(address).toBeInTheDocument();
  });

  it("progresses if required fields in contact form are complete", async () => {
    const { container } = render(
      <EmployeeForm employeeFormData={defaultValues} />
    );
    const firstName = screen.getByLabelText(/First name*/) as HTMLInputElement;
    const lastName = screen.getByLabelText(/Last name*/) as HTMLInputElement;
    const birthDate = screen.getByRole("textbox", {
      name: "",
    }) as HTMLInputElement;
    const gender = screen.getByRole("radio", {
      name: "Female",
    }) as HTMLInputElement;
    const ethnicity = container.querySelector(
      '[class="MuiSelect-nativeInput"]'
    ) as HTMLInputElement;

    act(() => {
      fireEvent.change(firstName, { target: { value: "Jane" } });
      fireEvent.change(lastName, { target: { value: "Doe" } });
      fireEvent.change(birthDate, { target: { value: "01/01/1990" } });
      fireEvent.click(gender);
      fireEvent.change(ethnicity, { target: { value: "CAUCASIAN" } });
    });

    fireEvent.submit(screen.getByTestId("0-form"));

    await screen.findByLabelText(/Email*/);
    const address = screen.getByLabelText(/Address*/) as HTMLInputElement;
    const city = screen.getByLabelText(/City*/) as HTMLInputElement;
    const state = container.querySelector(
      '[class="MuiSelect-nativeInput"]'
    ) as HTMLInputElement;
    const zipCode = screen.getByLabelText(/Zip Code*/) as HTMLInputElement;
    const phoneNumber = screen.getByLabelText(
      /Phone Number*/
    ) as HTMLInputElement;
    const email = screen.getByLabelText(/Email*/) as HTMLInputElement;

    act(() => {
      fireEvent.change(address, { target: { value: "111 Forest Ave" } });
      fireEvent.change(city, { target: { value: "Hanover" } });
      fireEvent.change(state, { target: { value: "PA" } });
      fireEvent.change(zipCode, { target: { value: "98463" } });
      fireEvent.change(phoneNumber, { target: { value: "(846)654-4536" } });
      fireEvent.change(email, { target: { value: "email@gmail.com" } });
    });

    fireEvent.submit(screen.getByTestId("1-form"));

    const skillsText = await screen.findByText("Skills Info Here");
    expect(skillsText).toBeInTheDocument();
  });

  it("navigates from skills info to contact section by clicking contact heading", async () => {
    const { container } = render(
      <EmployeeForm employeeFormData={defaultValues} />
    );
    const firstName = screen.getByLabelText(/First name*/) as HTMLInputElement;
    const lastName = screen.getByLabelText(/Last name*/) as HTMLInputElement;
    const birthDate = screen.getByRole("textbox", {
      name: "",
    }) as HTMLInputElement;
    const gender = screen.getByRole("radio", {
      name: "Female",
    }) as HTMLInputElement;
    const ethnicity = container.querySelector(
      '[class="MuiSelect-nativeInput"]'
    ) as HTMLInputElement;

    act(() => {
      fireEvent.change(firstName, { target: { value: "Jane" } });
      fireEvent.change(lastName, { target: { value: "Doe" } });
      fireEvent.change(birthDate, { target: { value: "01/01/1990" } });
      fireEvent.click(gender);
      fireEvent.change(ethnicity, { target: { value: "CAUCASIAN" } });
    });

    fireEvent.submit(screen.getByTestId("0-form"));

    await screen.findByLabelText(/Email*/);
    const address = screen.getByLabelText(/Address*/) as HTMLInputElement;
    const city = screen.getByLabelText(/City*/) as HTMLInputElement;
    const state = container.querySelector(
      '[class="MuiSelect-nativeInput"]'
    ) as HTMLInputElement;
    const zipCode = screen.getByLabelText(/Zip Code*/) as HTMLInputElement;
    const phoneNumber = screen.getByLabelText(
      /Phone Number*/
    ) as HTMLInputElement;
    const email = screen.getByLabelText(/Email*/) as HTMLInputElement;

    act(() => {
      fireEvent.change(address, { target: { value: "111 Forest Ave" } });
      fireEvent.change(city, { target: { value: "Hanover" } });
      fireEvent.change(state, { target: { value: "PA" } });
      fireEvent.change(zipCode, { target: { value: "98463" } });
      fireEvent.change(phoneNumber, { target: { value: "(846)654-4536" } });
      fireEvent.change(email, { target: { value: "email@gmail.com" } });
    });

    fireEvent.submit(screen.getByTestId("1-form"));

    await screen.findByText("Skills Info Here");
    fireEvent.click(screen.getByRole("button", { name: "Contact Info" }));

    expect(screen.getByLabelText(/Email*/)).toBeInTheDocument();
  });
});
