import { render, screen } from "@testing-library/react";
import React from "react";
import NotFound from "./NotFound";

describe("NotFound page", () => {
  beforeEach(() => {
    render(
        <NotFound />
    );
  });

  it("renders the NotFound page", () => {
    expect(screen.getByText(/404/)).toBeInTheDocument();
  });
});
