import React, { useEffect } from "react";
import "./App.scss";
import "@department-of-veterans-affairs/formation/dist/formation.min.css"
import Layout from "./Layout";
import { useAuthDispatch } from "./context/AuthContext/AuthContext";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary"

function App() {
  const authAction = useAuthDispatch();
  useEffect(() => {
    authAction({ type: "loadUser" });
  });
  return (
    <div className="App">
      <ErrorBoundary>
        <Layout></Layout>
      </ErrorBoundary>
    </div>
  );
}

export default App;
