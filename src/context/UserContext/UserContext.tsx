import React, { useCallback } from "react";
import { useAuthState } from "../AuthContext/AuthContext";
import AuthService from "../../services/Auth/AuthService";
import { IEmployee } from "../../models/Employee.interface";

export type LoginInfo = { username: string; password: string };
type UserAction = { type: "populate" | "clear"; payload?: IEmployee };
type UserDispatch = (action: UserAction) => void;
type UserState = {
  isAdmin: boolean;
  employeeInfo: IEmployee | undefined;
};
type UserProviderProps = { children: React.ReactNode };

const UserStateContext = React.createContext<UserState | undefined>(undefined);
const UserDispatchContext = React.createContext<UserDispatch | undefined>(
  undefined
);

const defaultState: UserState = {
  isAdmin: false,
  employeeInfo: undefined,
};

// const API = new AuthService();

function userReducer(state: UserState, action: UserAction) {
  switch (action.type) {
    case "populate": {
      return {
        ...state,
        employeeInfo: action.payload,
        isAdmin: true,
      };
    }
    case "clear": {
      return defaultState;
    }
  }
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { status, token } = useAuthState();

  const [state, dispatch]: [
    UserState,
    UserDispatch
  ] = React.useReducer(userReducer, { ...defaultState });

  const populateUser = useCallback(async () => {
    // const employeeService = new EmployeeService(token);
    // const employee: IEmployee = await employeeService
    //   .getByEmail(API.getEmail())
    //   .then((res) => res);
    dispatch({ type: "populate", payload: undefined });
  }, []);

  React.useEffect(() => {
    if (status === "authenticated" && token !== "") populateUser();
    if (status === "unauthenticated") dispatch({ type: "clear" });
  }, [status, populateUser, token]);

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
};

function useUserState(): UserState {
  const context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch(): UserDispatch {
  const context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }

  return context;
}

export { UserProvider, useUserState, useUserDispatch };
