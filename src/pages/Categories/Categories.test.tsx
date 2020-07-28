import { render, screen } from "@testing-library/react";
import React from "react";
import { UserProvider } from "../../context/UserContext/UserContext";
import CategoriesPage from "./Categories";

describe("Categories page", () => {
  beforeEach(() => {
    render(
        <CategoriesPage />
    );
  });

  it("renders the categories page", () => {
    expect(screen.getByText(/Categories/)).toBeInTheDocument();
  });
});
