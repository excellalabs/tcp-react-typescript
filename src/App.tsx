import React from "react";
import "./App.css";
import { useUserState } from "./context/UserContext/UserContext";
import Login from "./pages/Login/Login";
import { useAuth } from "./context/AuthContext/AuthContext";

function App() {
  const { loggedIn } = useUserState();
  return loggedIn ? (
    <h1>Logged In</h1>
  ) : (
    <>
      <Login />
    </>
  );
}

export default App;
