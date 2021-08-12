import React, { useCallback } from "react";
import AuthService from "../../services/Auth/AuthService";

type LoginInfo = { username: string; password: string };

type AuthAction = {
  type: "loginSuccess" | "login" | "loginFailure" | "logout" | "loadUser";
  payload?: LoginInfo;
};

type AuthState = {
  status: "authenticated" | "unauthenticated" | "loading";
  error: string;
  token: string;
  payload?: LoginInfo;
};
const AuthContext = React.createContext<AuthState | undefined>(undefined);

type AuthDispatch = (action: AuthAction) => void;
const AuthDispatchContext = React.createContext<AuthDispatch | undefined>(
  undefined
);

const API = new AuthService();
const defaultState: AuthState = {
  status: "unauthenticated",
  error: "",
  token: "",
};
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "loginSuccess": {
      return {
        ...state,
        status: "authenticated",
        error: "",
        token: AuthService.retrieveToken(),
        payload: undefined,
      };
    }
    case "loginFailure": {
      return {
        ...defaultState,
        error: "Login information not found",
      };
    }
    case "login": {
      return action.payload?.username === undefined ||
        action.payload.password === undefined
        ? state
        : {
            ...state,
            status: "loading",
            payload: {
                username: action.payload.username,
                password: action.payload.password,
            },
          };
    }
    case "logout": {
      API.logout();
      return {
        ...state,
        status: "unauthenticated",
      };
    }
    case "loadUser": {
      const token = AuthService.retrieveToken();
      if (!token) {
        return { ...state };
      }
      if (AuthService.tokenHasLifeLeft()) {
        return {
          ...state,
          status: "authenticated",
          token: token,
        };
      }
      return { ...state };
    }
  }
}

const AuthProvider: React.FC<{}> = (props) => {
  const [state, dispatch]: [AuthState, AuthDispatch] = React.useReducer(
    authReducer,
    defaultState
  );
  const loginNeeded = useCallback(async () => {
    if (state.payload === undefined) return;
    API.login(state.payload?.username, state.payload?.password)
      .then((res) => {
        const t = res.data?.user.token ?? ""
        API.saveToken(t);
        res.status === 200
          ? dispatch({ type: "loginSuccess" })
          : dispatch({ type: "loginFailure" });
      })
      .catch(() => {
        dispatch({ type: "loginFailure" });
      });
  }, [state.payload]);

  React.useEffect(() => {
    if (state.status === "loading") {
      loginNeeded();
    }
  }, [state.status, loginNeeded]);

  return (
    <AuthContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {props.children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
};

function useAuthDispatch(): AuthDispatch {
  const context = React.useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a AuthProvider");
  }

  return context;
}

function useAuthState() {
  const context = React.useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuthState, useAuthDispatch };
