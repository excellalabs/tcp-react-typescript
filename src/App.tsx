import React from "react";
import "./App.css";
import { UserProvider } from "./context/UserContext/UserContext";
import Login from "./pages/Login/Login";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Login />
      </UserProvider>
    </div>
  );
}

export default App;
