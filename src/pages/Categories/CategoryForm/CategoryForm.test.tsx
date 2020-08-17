import { render, screen } from "@testing-library/react";

import CategoryForm from "./CategoryForm";
import { ICategory } from "../../../models/Skill.interface";
import React from "react";

describe("CategoryForm page", () => {
  const mockSubmitHandler = jest.fn((category: ICategory) => {});
  beforeEach(() => {
    render(<CategoryForm submitCategory={mockSubmitHandler} />);
  });

  it("renders the CategoryForm page", () => {
    expect(screen.getByText(/CategoryForm/)).toBeInTheDocument();
  });
});
