import React from "react";
import {
  AuthProvider,
  useAuthDispatch,
} from "../../context/AuthContext/AuthContext";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import useSkillCategory from "./UseSkillCategory";

const TestComponent = () => {
  const { skillCategories } = useSkillCategory();
  const authAction = useAuthDispatch();
  return (
    <>
      <button
        data-testid={"login-button"}
        onClick={() => authAction({ type: "loginSuccess" })}
      >
        log in
      </button>
      <div data-testid="categories-length">{skillCategories.length}</div>
    </>
  );
};

describe("useSkillCategory hook", () => {
  beforeEach(() => {
    jest.spyOn(window.localStorage.__proto__, "getItem");
    window.localStorage.__proto__.getItem = jest.fn(() => {
      return "token";
    });
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
  });

  it("returns a default empty (length 0) array", () => {
    const length = screen.getByTestId("categories-length");
    expect(length.firstChild?.textContent).toBe("0");
  });

  it("returns a non-zero array when user is logged in", async () => {
    const button = screen.getByTestId("login-button");
    fireEvent.click(button);

    await waitFor(() => {
      const length = screen.getByTestId("categories-length");
      expect(length.firstChild?.textContent).toBe("1");
    });
  });
});
