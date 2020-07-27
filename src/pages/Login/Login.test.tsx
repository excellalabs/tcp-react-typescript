import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { UserProvider } from "../../context/UserContext/UserContext";
import Login from "./Login";

describe("Login page", () => {
  beforeEach(() => {
    render(
      <UserProvider>
        <Login />
      </UserProvider>
    );
  });

  it("renders the login page", () => {
    expect(screen.getByText(/Login/)).toBeInTheDocument();
  });

  it("renders login error when user/pass are incorrect", () => {
    const button = screen.getByTestId("submit-button");
    fireEvent.click(button);
    expect(screen.getByTestId("login-error")).toBeDefined();
  });
});
