import React, { useEffect } from "react";
import "./App.css";
import Layout from "./Layout";
import { useAuthDispatch } from "./context/AuthContext/AuthContext";

function App() {
  const authAction = useAuthDispatch();
  useEffect(() => {
    authAction({ type: "loadUser" });
  });
  return (
    <div className="App">
      <Layout></Layout>
    </div>
  );
}

export default App;
