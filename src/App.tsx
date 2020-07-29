import React from "react";
import "./App.css";
import { UserProvider } from "./context/UserContext/UserContext";
import Layout from "./Layout";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Layout></Layout>
      </UserProvider>
    </div>
  );
}

export default App;
