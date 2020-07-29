import { render, screen } from "@testing-library/react";
import React from "react";
import HomePage from "./Home";

describe("Employees page", () => {
  beforeEach(() => {
    render(
        <HomePage />
    );
  });

  it("renders the home page", () => {
    expect(screen.getByText(/Home/)).toBeInTheDocument();
  });
});
