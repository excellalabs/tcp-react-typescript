import { AxiosResponse } from "axios";

export type DecodedJWT = {
  user_name: string;
  scope: Array<string>;
  exp: number;
  authorities: Array<string>;
  email: string;
  jti: string;
  client_id: string;
};
export default interface ApiService {
  login: (username: string, password: string) => Promise<AxiosResponse>;
  logout: () => void;
  saveToken: (token: string) => void;
  getEmail: () => string;
  getRoles: () => Array<String>;
  isLoggedIn: () => boolean;
  isAdmin: () => boolean;
}
