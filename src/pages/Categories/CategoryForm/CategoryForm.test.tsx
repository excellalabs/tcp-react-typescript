import { render, screen } from "@testing-library/react";

import CategoryForm from "./CategoryForm";
import { ICategory } from "../../../models/Skill.interface";
import React from "react";

describe("CategoryForm page", () => {
  const mockSubmitHandler = jest.fn((category: ICategory) => {});
  beforeEach(() => {
    render(<CategoryForm submitCategory={mockSubmitHandler} />);
  });

  it("renders the Category Form input Label", () => {
    expect(screen.getByText(/Category Name/)).toBeInTheDocument();
  });

  it("renders the Category Form input", () => {
    expect(screen.getByLabelText(/Category Name/)).toBeInTheDocument();
  });

  it("renders the Category Form submit button", () => {
    expect(screen.getByText(/Add Category/)).toBeInTheDocument();
  });
});
