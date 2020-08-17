import { render, screen } from "@testing-library/react";

import CategoriesPage from "./Categories";
import React from "react";

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
