import React from "react";
import "./App.css";
import { UserProvider } from "./context/UserContext/UserContext";
import Layout from "./Layout";
import { AuthProvider } from "./context/AuthContext/AuthContext";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <UserProvider>
          <Layout></Layout>
        </UserProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
