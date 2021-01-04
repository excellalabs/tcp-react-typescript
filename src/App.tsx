import React from "react";
import "./App.scss";
import "@department-of-veterans-affairs/formation/dist/formation.min.css";
import Layout from "./Layout";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <Layout></Layout>
      </ErrorBoundary>
    </div>
  );
}

export default App;
