import React from "react";
import { AxiosError, AxiosResponse } from "axios";
import { DecodedJWT } from "../../services/interfaces/ApiService.interface";
import AxiosService from "../../services/AxiosService";

type AuthState = {
  status: string;
  error?: string;
  isLoading: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
  token: DecodedJWT | string | null;
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
        // setToken(res.data.access_token);
        setError(undefined);
        setStatus("authenticated");
      })
      .catch((error: AxiosError) => {
        setError(error.message);
        setStatus("unauthenticated");
      });
  };

  const logout = () => {
    api.logout();
  };

  React.useEffect(() => {
    setToken(AxiosService.retrieveToken());
  }, [localStorage.getItem(AxiosService.key)]);

  return (
    <AuthContext.Provider
      value={{
        status: status,
        isLoading: false,
        error: error,
        login,
        logout,
        token: token,
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
