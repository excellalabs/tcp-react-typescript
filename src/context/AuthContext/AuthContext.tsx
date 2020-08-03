import React from "react";
import { AxiosError, AxiosResponse } from "axios";
import { DecodedJWT } from "../../services/interfaces/ApiService.interface";
import AxiosService from "../../services/Axios/AxiosService";

type AuthState = {
  status: string;
  error?: string;
  isLoading: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
  token: DecodedJWT | string | null;
  loadUser: () => void;
};
const AuthContext = React.createContext<AuthState | undefined>(undefined);

const AuthProvider: React.FC<{}> = (props) => {
  const [error, setError] = React.useState<string | undefined>(undefined);
  const [status, setStatus] = React.useState("unauthenticated");
  const [token, setToken] = React.useState(AxiosService.retrieveToken());

  const api = new AxiosService();
  const login = (username: string, password: string) => {
    api
      .login(username, password)
      .then((res: AxiosResponse) => {
        api.saveToken(res.data.access_token);
        setError("");
        setStatus("authenticated");
      })
      .catch((error: AxiosError) => {
        setError(error.message);
        setStatus("unauthenticated");
      });
  };

  const logout = () => {
    setStatus("unauthenticated");
    setToken("");
    api.logout();
  };

  const loadUser = () => {
    const token = AxiosService.retrieveToken();
    if (!token) {
      return;
    }

    setToken(token);
    if (AxiosService.tokenHasLifeLeft()) {
      setStatus("authenticated");
      setError("");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        status: status,
        isLoading: false,
        error: error,
        login,
        logout,
        token: token,
        loadUser: loadUser,
      }}
      {...props}
    />
  );
};

function useAuth() {
  const context = React.useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
