import React from "react";
import "./App.css";
import { UserProvider } from "./context/UserContext/UserContext";
import Login from "./pages/Login/Login";
import EmployeeForm from "./pages/EmployeeForm/EmployeeForm";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Login />
      </UserProvider>
      <EmployeeForm />
    </div>
  );
}

export default App;
