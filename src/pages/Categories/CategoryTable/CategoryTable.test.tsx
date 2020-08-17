import { render, screen } from "@testing-library/react";

import CategoryTable from "./CategoryTable";
import React from "react";

describe("CategoryTable page", () => {
  beforeEach(() => {
    render(<CategoryTable />);
  });

  it("renders the CategoryTable page", () => {
    expect(screen.getByText(/CategoryTable/)).toBeInTheDocument();
  });
});
