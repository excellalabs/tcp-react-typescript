import React from "react";
import axios, { AxiosRequestConfig } from "axios";

type AuthState = {
  status: string;
  error?: string;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
};
const AuthContext = React.createContext<AuthState | undefined>(undefined);

const AuthProvider: React.FC<{}> = (props) => {
  const AxiosService = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
      Authorization: `Basic ${btoa(
        "app:$2a$04$hqawBldLsWkFJ5CVsvtL7ed1z9yeoknfuszPOEHWzxfLBoViK6OVi"
      )}`,
      Accept: "*/*",
    },
  } as AxiosRequestConfig);

  const login = () => {
    AxiosService.post("/oauth/token?grant_type=client_credentials", {
      scope: "read write",
    }).then((res) => console.log(res));
  };

  const logout = () => {};

  return (
    <AuthContext.Provider
      value={{ status: "unauthenticated", isLoading: false, login, logout }}
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
