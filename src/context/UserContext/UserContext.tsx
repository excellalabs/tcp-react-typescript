import React from "react";

export type LoginInfo = { username: string; password: string };
type UserAction = { type: "login" | "logout"; payload?: LoginInfo };
type UserDispatch = (action: UserAction) => void;
type UserState = { loggedIn: boolean; error: string };
type UserProviderProps = { children: React.ReactNode };

const UserStateContext = React.createContext<UserState | undefined>(undefined);
const UserDispatchContext = React.createContext<UserDispatch | undefined>(
  undefined
);

function userReducer(state: UserState, action: UserAction) {
  switch (action.type) {
    case "login": {
      if (
        action.payload?.username === "user" &&
        action.payload?.password === "pass"
      )
        return {
          loggedIn: true,
          error: "",
        };
      return { loggedIn: false, error: "Failed to login" };
    }
    case "logout": {
      return { ...state, loggedIn: false };
    }
  }
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [state, dispatch]: [
    UserState,
    UserDispatch
  ] = React.useReducer(userReducer, { loggedIn: false, error: "" });

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
    throw new Error("useUserState must be used within a CountProvider");
  }

  return context;
}

function useUserDispatch(): UserDispatch {
  const context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a CountProvider");
  }

  return context;
}

export { UserProvider, useUserState, useUserDispatch };
