import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ErrorBoundary from "./ErrorBoundary";

describe("UserContext", () => {
  function throwError() {
      <div />
  }

  class ErrorComponent extends React.Component {
    render() {
        throw new Error("error")
    }
  }

  class Button extends React.Component {
    state = {renderError: false}
    handleButtonClick = () => this.setState({renderError: true})
    render() {
        return (
            this.state.renderError ? (
            <ErrorComponent />
            ) : (
            <button data-testid="testButton" onClick={this.handleButtonClick} />
            )
        )
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
    fireEvent.click(testButton);
    expect(screen.getByText("Something went wrong.")).toBeInTheDocument();
  });
});
