import React from "react";
import { AxiosError, AxiosResponse } from "axios";
import { DecodedJWT } from "../../services/interfaces/ApiService.interface";
import AxiosService from "../../services/Axios/AxiosService";

type AuthState = {
  status: "authenticated" | "unauthenticated";
  error: string;
  token: string;
};

type LoginInfo = { username: string; password: string };
type AuthAction = {
  type: "login" | "logout" | "loadUser";
  payload?: LoginInfo;
};

const AuthContext = React.createContext<AuthState | undefined>(undefined);

type AuthDispatch = (action: AuthAction) => void;
const AuthDispatchContext = React.createContext<AuthDispatch | undefined>(
  undefined
);

const API = new AxiosService();

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "login": {
      const username = action.payload?.username;
      const password = action.payload?.password;
      if (username === undefined || password === undefined) {
        return state;
      }
      const response = API.login(username, password);
      response
        .then((res: AxiosResponse) => {
          API.saveToken(res.data?.access_token);
          return {
            ...state,
            status: "authenticated",
            error: "",
          };
        })
        .catch((error: AxiosError) => {
          return {
            ...state,
            status: "unauthenticated",
            error: error.message,
          };
        });
    }
    case "logout": {
      API.logout();
      return {
        ...state,
        status: "unauthenticated",
      };
    }
    case "loadUser": {
      const token = AxiosService.retrieveToken();
      if (!token) {
        return { ...state };
      }
      if (AxiosService.tokenHasLifeLeft()) {
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
  // const [error, setError] = React.useState<string | undefined>(undefined);
  // const [status, setStatus] = React.useState("unauthenticated");
  // const [token, setToken] = React.useState(AxiosService.retrieveToken());
  const defaultState: AuthState = {
    status: "unauthenticated",
    error: "",
    token: "",
  };

  const [state, dispatch]: [AuthState, AuthDispatch] = React.useReducer(
    authReducer,
    defaultState
  );

  // const api = new AxiosService();
  // const login = (username: string, password: string) => {
  //   api
  //     .login(username, password)
  //     .then((res: AxiosResponse) => {
  //       api.saveToken(res.data.access_token);
  //       setError("");
  //       setStatus("authenticated");
  //     })
  //     .catch((error: AxiosError) => {
  //       setError(error.message);
  //       setStatus("unauthenticated");
  //     });
  // };

  // const logout = () => {
  //   setStatus("unauthenticated");
  //   setToken("");
  //   api.logout();
  // };

  // const loadUser = () => {
  //   const token = AxiosService.retrieveToken();
  //   if (!token) {
  //     return;
  //   }

  //   setToken(token);
  //   if (AxiosService.tokenHasLifeLeft()) {
  //     setStatus("authenticated");
  //     setError("");
  //   }
  // };

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
    throw new Error("useUserDispatch must be used within a CountProvider");
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
