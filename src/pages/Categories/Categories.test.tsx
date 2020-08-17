import { render, screen } from "@testing-library/react";

import CategoriesPage from "./Categories";
import React from "react";

describe("Categories page", () => {
  beforeEach(() => {
    render(<CategoriesPage />);
  });

  it("renders the Category Form page", () => {
    expect(screen.getByLabelText(/Category Name/)).toBeInTheDocument();
  });

  it("renders the Category Table page", () => {
    expect(screen.getByText(/# of Skills/)).toBeInTheDocument();
  });
});
