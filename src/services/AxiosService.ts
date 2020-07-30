import axios, { AxiosResponse, AxiosRequestConfig, AxiosInstance } from "axios";
import ApiService from "./interfaces/ApiService.interface";
import { jwt_decode } from "jwt-decode";

export default class AxiosService implements ApiService {
  static key = "tcp-react";
  tokenEndpoint = "/oauth/token";
  authorizationEndpoint = "/oauth/authorization";

  axiosClient: AxiosInstance;

  constructor() {
    this.axiosClient = axios.create({
      baseURL: "http://localhost:8080/api",
      headers: {
        Authorization: `Basic ${btoa(
          "app:$2a$04$hqawBldLsWkFJ5CVsvtL7ed1z9yeoknfuszPOEHWzxfLBoViK6OVi"
        )}`,
        Accept: "*/*",
      },
    } as AxiosRequestConfig);
  }

  login(username: string, password: string): Promise<AxiosResponse> {
    return this.axiosClient.post(
      `/oauth/token?grant_type=password&username=${username}&password=${password}&scope=read%20write`
    );
  }

  saveToken(token: string) {
    localStorage.setItem(AxiosService.key, token);
  }

  retrieveToken(decoded: boolean = false) {
    const token = localStorage.getItem(AxiosService.key);
    try {
      if (token) {
        const decodedToken = jwt_decode(token);
        const tokenLifeLeft = decodedToken.exp - new Date().getTime() / 1000;
        if (tokenLifeLeft < 0) {
          // this.logout()
          return null;
        }
      }

      return decoded ? jwt_decode(token) : token;
    } catch (err) {
      // this.logout()
    }
  }
}
