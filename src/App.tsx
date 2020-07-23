import React from "react";
import "./App.css";
import { UserProvider } from "./context/UserContext/UserContext";
import SignIn from "./Components/SignIn";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <SignIn />
      </UserProvider>
    </div>
  );
}

export default App;
