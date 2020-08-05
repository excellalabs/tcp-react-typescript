import axios, { AxiosResponse, AxiosRequestConfig, AxiosInstance } from "axios";
import ApiService, { DecodedJWT } from "../interfaces/ApiService.interface";

const jwtDecode = require("jwt-decode");

export default class AxiosService implements ApiService {
  static key = "tcp-react";
  tokenEndpoint = "/oauth/token";
  authorizationEndpoint = "/oauth/authorization";

  config: AxiosRequestConfig;

  constructor() {
    this.config = {
      baseURL: "http://localhost:8080/api",
      headers: {
        Authorization: `Basic ${btoa(
          "app:$2a$04$hqawBldLsWkFJ5CVsvtL7ed1z9yeoknfuszPOEHWzxfLBoViK6OVi"
        )}`,
        Accept: "*/*",
      },
    };
  }

  login(username: string, password: string): Promise<AxiosResponse> {
    return axios.post(
      `/oauth/token?grant_type=password&username=${username}&password=${password}&scope=read%20write`,
      {},
      this.config
    );
  }

  logout(): void {
    localStorage.removeItem(AxiosService.key);
  }

  saveToken(token: string) {
    localStorage.setItem(AxiosService.key, token);
  }

  static retrieveToken(): string | null {
    const token = localStorage.getItem(AxiosService.key);
    return token;
  }

  static decodedToken(): DecodedJWT | null {
    const token = this.retrieveToken();
    return token === null ? null : jwtDecode(token);
  }

  static tokenHasLifeLeft() {
    const token = localStorage.getItem(AxiosService.key);
    const decodedToken = jwtDecode(token) as DecodedJWT;
    const tokenLifeLeft = decodedToken.exp - new Date().getTime() / 1000;
    return tokenLifeLeft > 0;
  }
}
