import { render, screen, act, fireEvent } from "@testing-library/react";

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

  it("clears the category form on submit", () => {
    // Arrange
    const categoryName = screen.getByLabelText(/Category Name/) as HTMLInputElement;
    const addButton = screen.getByText(/Add Category/) as HTMLInputElement;
    // Act
    act(() => {
      fireEvent.change(categoryName, { target: { value: "Test Category" } });
      fireEvent.click(addButton);
    });
    // Assert
    expect(categoryName.value).toBe("");
  });
});
