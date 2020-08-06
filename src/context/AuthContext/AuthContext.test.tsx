import { AuthProvider, useAuthState, useAuthDispatch } from "./AuthContext";
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

const mockAxios = jest.mock("../../__mocks__/axios");

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
      <button
        data-testid="login-failure"
        onClick={() =>
          authActions({
            type: "login",
            payload: { username: "user", password: "wrong-pass" },
          })
        }
      ></button>
      <button
        data-testid="logout"
        onClick={() => authActions({ type: "logout" })}
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

  it("login function works", async () => {
    const loginButton = screen.getByTestId("login");
    fireEvent.click(loginButton);
    const expectedStatus = "loading";
    let statusDiv = screen.getByTestId("status");
    expect(statusDiv.firstChild?.nodeValue).toBe(expectedStatus);
    await waitFor(() => {
      let statusDiv = screen.getByTestId("status");
      expect(statusDiv.firstChild?.nodeValue).toBe("authenticated");
    });
  });

  it("returns unauthenticated when login credentials are wrong", async () => {
    const loginButton = screen.getByTestId("login-failure");
    fireEvent.click(loginButton);
    const expectedStatus = "unauthenticated";
    await waitFor(() => {
      let statusDiv = screen.getByTestId("status");
      expect(statusDiv.firstChild?.nodeValue).toBe(expectedStatus);
    });
  });
});
