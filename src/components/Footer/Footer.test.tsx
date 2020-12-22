import { render, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext/AuthContext";
import Footer from "./Footer";

describe("Footer", () => {
  beforeEach(() => {
      render(
        <AuthProvider>
            <BrowserRouter>
                <Footer />
            </BrowserRouter>
        </AuthProvider>
      )
  });
  
  it("renders Va Logo by default", () => {
    expect(screen.getByTestId('va-white-logo')).toBeInTheDocument();
  });
});
