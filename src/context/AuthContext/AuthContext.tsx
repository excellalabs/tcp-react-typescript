import React from "react";
import { AxiosError, AxiosResponse } from "axios";
import ApiService from "../../services/interfaces/ApiService.interface";

type AuthState = {
  status: string;
  error?: string;
  isLoading: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
};
const AuthContext = React.createContext<AuthState | undefined>(undefined);

const AuthProvider: React.FC<{ apiService: ApiService }> = (props) => {
  const [error, setError] = React.useState<string | undefined>(undefined);
  const [status, setStatus] = React.useState("unauthenticated");

  const api = props.apiService;
  const login = (username: string, password: string) => {
    api
      .login(username, password)
      .then((res: AxiosResponse) => {
        api.saveToken(res.data.access_token);
        setError(undefined);
        setStatus("authenticated");
      })
      .catch((error: AxiosError) => {
        setError(error.message);
        setStatus("unauthenticated");
      });
  };

  const logout = () => {
    localStorage.removeItem("tcp-react");
  };

  return (
    <AuthContext.Provider
      value={{
        status: status,
        isLoading: false,
        error: error,
        login,
        logout,
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
