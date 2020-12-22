import { render, screen } from "@testing-library/react";
import React from "react";
import CategoryCard from "./CategoryCard";

describe("CategoryCard", () => {
  beforeEach(() => {
    render(<CategoryCard category="Education" />);
  });

  it("renders the category name", () => {
    expect(screen.getByText("Education")).toBeInTheDocument();
  });
});
