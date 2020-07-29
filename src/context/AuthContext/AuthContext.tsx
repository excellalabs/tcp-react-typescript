import React from "react";
import axios, { AxiosRequestConfig, AxiosError } from "axios";

type AuthState = {
  status: string;
  error?: string;
  isLoading: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
};
const AuthContext = React.createContext<AuthState | undefined>(undefined);

const AuthProvider: React.FC<{}> = (props) => {
  const [error, setError] = React.useState<string | undefined>(undefined);
  const [status, setStatus] = React.useState("unauthenticated");
  const AxiosService = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
      Authorization: `Basic ${btoa(
        "app:$2a$04$hqawBldLsWkFJ5CVsvtL7ed1z9yeoknfuszPOEHWzxfLBoViK6OVi"
      )}`,
      Accept: "*/*",
    },
  } as AxiosRequestConfig);

  const login = (username: string, password: string) => {
    AxiosService.post(
      `/oauth/token?grant_type=password&username=${username}&password=${password}&scope=read%20write`
    )
      .then((res) => localStorage.setItem("tcp-react", res.data.access_token))
      .then(() => {
        setError(undefined);
        setStatus("authenticated");
      })
      .catch((error: AxiosError) => {
        setError(error.message);
        setStatus("unauthenticated");
      });
  };

  const logout = () => {};

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
