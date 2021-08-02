import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { AuthProvider } from "./context/AuthContext/AuthContext";
import { UserProvider } from "./context/UserContext/UserContext";

console.log("use msw", process.env.USE_MSW)
console.log("process", process.env)

if (process.env.REACT_APP_USE_MSW === 'true') {
  const { worker } = require("./mocks/browser")
  worker.start()
}


ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
