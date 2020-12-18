import { AxiosResponse, AxiosRequestConfig } from "axios";
import ApiService, { DecodedJWT } from "../interfaces/ApiService.interface";
import { Role } from "../../models/UserRole.enum";
import { axiosInstance } from "../axios-instance"
const jwtDecode = require("jwt-decode");

export default class AuthService implements ApiService {
  static key = "tcp-react";
  tokenEndpoint = "/oauth/token";
  authorizationEndpoint = "/oauth/authorization";

  config: AxiosRequestConfig;

  constructor() {
    this.config = {
      baseURL: process.env.REACT_APP_API,
      headers: {
        Authorization: `Basic ${btoa(
          "app:$2a$04$hqawBldLsWkFJ5CVsvtL7ed1z9yeoknfuszPOEHWzxfLBoViK6OVi"
        )}`,
        Accept: "*/*",
      },
    };
  }

  login(username: string, password: string): Promise<AxiosResponse> {
    return axiosInstance.post(
      `/oauth/token?grant_type=password&username=${username}&password=${password}&scope=read%20write`,
      {},
      this.config
    );
  }

  logout(): void {
    localStorage.removeItem(AuthService.key);
  }

  saveToken(token: string) {
    localStorage.setItem(AuthService.key, token);
  }

  getEmail() {
    const token = AuthService.decodedToken();
    return token?.email ? token.email : "";
  }

  getRoles() {
    const token = AuthService.decodedToken();
    return token?.authorities ? token.authorities : [Role.user];
  }

  isLoggedIn() {
    return !!AuthService.retrieveToken();
  }

  isAdmin() {
    return this.getRoles().includes(Role.admin);
  }

  static retrieveToken(): string {
    const token = localStorage.getItem(AuthService.key);
    return token ? token : "";
  }

  static decodedToken(): DecodedJWT | null {
    const token = this.retrieveToken();
    return token === "" ? null : jwtDecode(token);
  }

  static tokenHasLifeLeft() {
    const token = localStorage.getItem(AuthService.key);
    const decodedToken = jwtDecode(token) as DecodedJWT;
    const tokenLifeLeft = decodedToken.exp - new Date().getTime() / 1000;
    return tokenLifeLeft > 0;
  }
}
