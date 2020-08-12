import React from "react";
import useEmployee from "./UseEmployee";
import {
  useAuthState,
  AuthProvider,
  useAuthDispatch,
} from "../../context/AuthContext/AuthContext";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

const TestComponent = () => {
  const { employees } = useEmployee();
  const { status } = useAuthState();
  const authAction = useAuthDispatch();
  return (
    <>
      <button
        data-testid={"login-button"}
        onClick={() => authAction({ type: "loginSuccess" })}
      >
        log in
      </button>
      <div data-testid="employees-length">{employees.length}</div>
    </>
  );
};

describe("useEmployee hook", () => {
  beforeEach(() => {
    jest.spyOn(window.localStorage.__proto__, "getItem");
    window.localStorage.__proto__.getItem = jest.fn(() => {
      return "token";
    });
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
  });

  it("returns a default empty (length 0) array", () => {
    const length = screen.getByTestId("employees-length");
    expect(length.firstChild?.textContent).toBe("0");
  });

  it("returns a non-zero array when user is logged in", async () => {
    const button = screen.getByTestId("login-button");
    fireEvent.click(button);

    await waitFor(() => {
      const length = screen.getByTestId("employees-length");
      expect(length.firstChild?.textContent).toBe("1");
    });
  });
});
