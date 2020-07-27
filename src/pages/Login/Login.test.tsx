import { render } from "@testing-library/react";
import React from "react";
import { UserProvider } from "../../context/UserContext/UserContext";
import Login from "./Login";

describe("Login page", () => {
  beforeEach(() => {
    render(
      <UserProvider>
        <Login />
      </UserProvider>
    );
  });
});
