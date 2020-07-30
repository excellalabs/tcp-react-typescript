import { AxiosResponse } from "axios";

export default interface ApiService {
  login: (username: string, password: string) => Promise<AxiosResponse>;
}
