import { render, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext/AuthContext";
import Header from "./Header";

describe("Header", () => {
  beforeEach(() => {
      render(
        <AuthProvider>
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        </AuthProvider>
      )
  });

  it("renders Sign in/out button by default", () => {
    expect(screen.getByText(/Sign/)).toBeInTheDocument();
  });

  it("renders Va Logo by default", () => {
    expect(screen.getByTestId('va-main-logo')).toBeInTheDocument();
  });
});
