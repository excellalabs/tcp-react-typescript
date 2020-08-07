import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { UserProvider, useUserState, useUserDispatch } from "./UserContext";
import { AuthProvider } from "../AuthContext/AuthContext";
import {
  Employee,
  GENDER,
  ETHNICITY,
  IEmployee,
} from "../../models/Employee.interface";
import { PROFICIENCY } from "../../models/Skill.interface";

const UserContextExample: React.FC<{}> = () => {
  const { employeeInfo } = useUserState();
  const callUserAction = useUserDispatch();

  const employee: IEmployee = {
    bio: {
      firstName: "",
      lastName: "",
      middleInitial: "",
      birthDate: new Date(),
      gender: GENDER.MALE,
      ethnicity: ETHNICITY.AMERICAN_INDIAN,
      usCitizen: true,
    },
    contact: {
      email: "a",
      phoneNumber: "",
      address: {
        line1: "",
        line2: "",
        zipCode: "",
        city: "",
        stateCode: "",
      },
    },
    skills: [
      {
        id: 2,
        skill: { id: 2, name: "", category: { name: "", id: 1 } },
        proficiency: PROFICIENCY.LOW,
        primary: true,
      },
    ],
    id: 1,
  };

  const login = () => {
    callUserAction({
      type: "populate",
      payload: { ...employee },
    });
  };
  const logout = () => {
    callUserAction({ type: "clear" });
  };

  if (employeeInfo)
    return (
      <button data-testid="logoutButton" onClick={logout}>
        Log Out
      </button>
    );
  return (
    <button data-testid="loginButton" onClick={login}>
      Sign In
    </button>
  );
};

describe("UserContext", () => {
  beforeEach(() => {
    render(
      <AuthProvider>
        <UserProvider>
          <UserContextExample />
        </UserProvider>
      </AuthProvider>
    );
  });

  it("renders default sign in page", () => {
    expect(screen.getByTestId("loginButton")).toBeInTheDocument();
  });

  it("changes state after clicking Log In Button, and then back after clicking log out", () => {
    const signinButton = screen.getByTestId("loginButton");

    fireEvent.click(signinButton);

    const logoutButton = screen.getByTestId("logoutButton");
    expect(logoutButton).toBeInTheDocument();

    fireEvent.click(logoutButton);
    expect(signinButton).toBeInTheDocument();
  });
});
