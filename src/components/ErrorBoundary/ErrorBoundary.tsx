import React, { ReactNode } from "react";

class ErrorBoundary extends React.Component<{},any> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: any, info: any) {
    // Display fallback UI
    this.setState({ hasError: true });

    // Should add some sort of error logging here
    // errorLoggingFunction(error, info);
  }

  render() {
    const myStyle = {
      paddingLeft: "30px"
    }
    if (this.state.hasError) {
      return (
        <div style={myStyle}>
          <h1>Something went wrong.</h1>
          <a href="/">Return to Home</a>
        </div>
      )
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
