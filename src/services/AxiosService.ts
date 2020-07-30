import axios, { AxiosResponse, AxiosRequestConfig, AxiosInstance } from "axios";
import ApiService from "./interfaces/ApiService.interface";

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
}
