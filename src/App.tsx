import React, { useEffect } from "react";
import "./App.css";
import Layout from "./Layout";
import { useAuth } from "./context/AuthContext/AuthContext";
import { useUserState } from "./context/UserContext/UserContext";

function App() {
  const { loadUser } = useAuth();
  const { email } = useUserState();
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
