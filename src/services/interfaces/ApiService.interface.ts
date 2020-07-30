import { AxiosResponse } from "axios";

export default interface ApiService {
  login: (username: string, password: string) => Promise<AxiosResponse>;

  saveToken: (token: string) => void;
  retrieveToken: () => string | null;
}
