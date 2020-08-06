import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import ContactForm from "./ContactForm";
import { Formik } from "formik";
import { ValidationError } from "yup";
import {
  contactFormInitialValues,
  contactFormSchema,
  IEmployeeContactForm,
} from "./ContactForm.schema";

describe("ContactForm", () => {
  function mockSubmit(values: IEmployeeContactForm) {
    jest.fn;
  }

  beforeEach(() => {
    render(
      <Formik
        initialValues={contactFormInitialValues}
        validationSchema={contactFormSchema}
        onSubmit={mockSubmit}
      >
        {(formik) => (
          <form data-testid="form">
            <ContactForm formGroup="contact" />;
          </form>
        )}
      </Formik>
    );
  });

  it("renders contact form fields", () => {
    expect(screen.getByLabelText("Address*")).toBeInTheDocument();
    expect(screen.getByLabelText("City*")).toBeInTheDocument();
    expect(screen.getByText("State*")).toBeInTheDocument();
    expect(screen.getByLabelText("Zip Code*")).toBeInTheDocument();
    expect(screen.getByLabelText("Phone Number*")).toBeInTheDocument();
    expect(screen.getByLabelText("Email*")).toBeInTheDocument();
  });

  it("validates contact object with required fields", async () => {
    const testInfo = {
      address1: "1111 Forest Street",
      city: "Washington",
      state: "DC",
      zipCode: "74853",
      phoneNumber: "(897)987-6545",
      email: "forest@gmail.com",
    };

    await expect(contactFormSchema.validate(testInfo)).resolves;
  });

  it("throws validation error when address is missing", async () => {
    const testInfo = {
      address1: "",
      city: "Washington",
      state: "DC",
      zipCode: "74853",
      phoneNumber: "(897)987-6545",
      email: "forest@gmail.com",
    };

    expect.assertions(1);
    await expect(contactFormSchema.validate(testInfo)).rejects.toEqual(
      new ValidationError("Address is required", "", "")
    );
  });

  it("throws validation error when city is missing", async () => {
    const testInfo = {
      address1: "1111 Forest Street",
      city: "",
      state: "DC",
      zipCode: "74853",
      phoneNumber: "(897)987-6545",
      email: "forest@gmail.com",
    };

    expect.assertions(1);
    await expect(contactFormSchema.validate(testInfo)).rejects.toEqual(
      new ValidationError("City is required", "", "")
    );
  });

  it("throws validation error when state is missing", async () => {
    const testInfo = {
      address1: "1111 Forest Street",
      city: "Washington",
      state: "",
      zipCode: "74853",
      phoneNumber: "(897)987-6545",
      email: "forest@gmail.com",
    };

    expect.assertions(1);
    await expect(contactFormSchema.validate(testInfo)).rejects.toEqual(
      new ValidationError("State is required", "", "")
    );
  });

  it("throws validation error when zip code is missing", async () => {
    const testInfo = {
      address1: "1111 Forest Street",
      city: "Washington",
      state: "DC",
      zipCode: "",
      phoneNumber: "(897)987-6545",
      email: "forest@gmail.com",
    };

    expect.assertions(1);
    await expect(contactFormSchema.validate(testInfo)).rejects.toEqual(
      new ValidationError("Zip code is required", "", "")
    );
  });

  it("throws validation error when zip code is less than 5 digits", async () => {
    const testInfo = {
      address1: "1111 Forest Street",
      city: "Washington",
      state: "DC",
      zipCode: "555",
      phoneNumber: "(897)987-6545",
      email: "forest@gmail.com",
    };

    expect.assertions(1);
    await expect(contactFormSchema.validate(testInfo)).rejects.toEqual(
      new ValidationError("Zip code must be 5 digits", "", "")
    );
  });

  it("throws validation error when zip code is not digits", async () => {
    const testInfo = {
      address1: "1111 Forest Street",
      city: "Washington",
      state: "DC",
      zipCode: "afdsd",
      phoneNumber: "(897)987-6545",
      email: "forest@gmail.com",
    };

    expect.assertions(1);
    await expect(contactFormSchema.validate(testInfo)).rejects.toEqual(
      new ValidationError("Zip code must be 5 digits", "", "")
    );
  });

  it("throws validation error when phone number is missing", async () => {
    const testInfo = {
      address1: "1111 Forest Street",
      city: "Washington",
      state: "DC",
      zipCode: "56473",
      phoneNumber: "",
      email: "forest@gmail.com",
    };

    expect.assertions(1);
    await expect(contactFormSchema.validate(testInfo)).rejects.toEqual(
      new ValidationError("Phone number is required", "", "")
    );
  });

  it("throws validation error when phone number is formatted incorrectly", async () => {
    const testInfo = {
      address1: "1111 Forest Street",
      city: "Washington",
      state: "DC",
      zipCode: "56473",
      phoneNumber: "897-987-6545",
      email: "forest@gmail.com",
    };

    expect.assertions(1);
    await expect(contactFormSchema.validate(testInfo)).rejects.toEqual(
      new ValidationError("Phone number formatted like: (xxx)xxx-xxxx", "", "")
    );
  });

  it("throws validation error when email is missing", async () => {
    const testInfo = {
      address1: "1111 Forest Street",
      city: "Washington",
      state: "DC",
      zipCode: "56473",
      phoneNumber: "(987)876-7654",
      email: "",
    };

    expect.assertions(1);
    await expect(contactFormSchema.validate(testInfo)).rejects.toEqual(
      new ValidationError("Email is required", "", "")
    );
  });

  it("throws validation error when email is formatted incorrectly", async () => {
    const testInfo = {
      address1: "1111 Forest Street",
      city: "Washington",
      state: "DC",
      zipCode: "56473",
      phoneNumber: "(897)987-6545",
      email: "forest@gmail",
    };

    expect.assertions(1);
    await expect(contactFormSchema.validate(testInfo)).rejects.toEqual(
      new ValidationError("Invalid email", "", "")
    );
  });
});
