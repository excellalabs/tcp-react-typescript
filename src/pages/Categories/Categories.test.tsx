import { render, screen } from "@testing-library/react";

import Categories from "./Categories";
import { AuthProvider } from "../../context/AuthContext/AuthContext";
import React from "react";

describe("Categories page", () => {
  beforeEach(() => {
    render(
      <AuthProvider>
        <Categories />
      </AuthProvider>
    );
  });

  it("renders the Category Form page", () => {
    expect(screen.getByLabelText(/Category Name/)).toBeInTheDocument();
  });

  it("renders the Category Table page", () => {
    expect(screen.getByText(/# of Skills/)).toBeInTheDocument();
  });
});
