import React, { useEffect } from "react";
import "./App.css";
import Layout from "./Layout";
import { useAuth } from "./context/AuthContext/AuthContext";

function App() {
  const { loadUser } = useAuth();
  useEffect(() => {
    loadUser();
  });
  return (
    <div className="App">
      <Layout></Layout>
    </div>
  );
}

export default App;
