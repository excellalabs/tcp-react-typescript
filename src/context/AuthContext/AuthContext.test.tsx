import { AuthProvider, useAuthState, useAuthDispatch } from "./AuthContext";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

jest.mock("../../__mocks__/axios");

const TestComponent = () => {
  const { status, error } = useAuthState();
  const authActions = useAuthDispatch();
  return (
    <>
      <div data-testid="status">{status}</div>
      <div data-testid="error">{error}</div>
      <button
        data-testid="login"
        onClick={() =>
          authActions({
            type: "login",
            payload: { username: "user", password: "pass" },
          })
        }
      ></button>
    </>
  );
};

describe("AuthContext", () => {
  beforeEach(() => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    jest.spyOn(window.localStorage.__proto__, "getItem");
    window.localStorage.__proto__.getItem = jest.fn(() => null);
  });

  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });
  it("has default values", () => {
    const defaultStatus = "unauthenticated";
    const statusDiv = screen.getByTestId("status");
    const defaultError = undefined;
    const errorDiv = screen.getByTestId("error");

    expect(statusDiv.firstChild?.nodeValue).toBe(defaultStatus);
    expect(errorDiv.firstChild?.nodeValue).toBe(defaultError);
  });
  it("logs in successfully", () => {
    // const loginButton = screen.getByTestId("login");
    // console.log();
    // fireEvent.click(loginButton);
    // const expectedStatus = "authenticated";
    // const statusDiv = screen.getByTestId("status");
    // expect(statusDiv.firstChild?.nodeValue).toBe(expectedStatus);
  });
});
