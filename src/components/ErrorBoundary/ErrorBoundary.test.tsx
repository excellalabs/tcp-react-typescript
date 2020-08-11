import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ErrorBoundary from "./ErrorBoundary";

describe("UserContext", () => {
  function throwError() {
      errorThrower()
  }

  class Button extends React.Component {
    render() {
      return <button data-testid="testButton" onClick={() => { errorThrower() }} />
    }
  }

  beforeEach(() => {
    render(
      <ErrorBoundary>
        <Button/>
      </ErrorBoundary>
    );
  });

  it("renders default button", () => {
    expect(screen.getByTestId("testButton")).toBeInTheDocument();
  });

  it("errors out when clicking button", () => {
    const testButton = screen.getByTestId("testButton");
    console.log(screen.debug())
    fireEvent.click(testButton);
    console.log(screen.debug())
    expect(screen.getByText("Something")).toBeInTheDocument();
  });
});
