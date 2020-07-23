import React from "react";

type UserAction = { type: "login" } | { type: "logout" };
type UserDispatch = (action: UserAction) => void;
type UserState = { loggedIn: boolean };
type UserProviderProps = { children: React.ReactNode };

const UserStateContext = React.createContext<UserState | undefined>(undefined);
const UserDispatchContext = React.createContext<UserDispatch | undefined>(
  undefined
);

function userReducer(state: UserState, action: UserAction) {
  switch (action.type) {
    case "login": {
      return { loggedIn: true };
    }
    case "logout": {
      return { loggedIn: false };
    }
  }
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [state, dispatch]: [
    UserState,
    UserDispatch
  ] = React.useReducer(userReducer, { loggedIn: false });

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
