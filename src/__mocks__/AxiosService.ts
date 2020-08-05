import ApiService from "../services/interfaces/ApiService.interface";
import { AxiosResponse } from "axios";

export default {
  AxiosService: jest.fn().mockImplementation(() => {
    return {
      login: jest.fn(() => Promise.resolve()),
    };
  }),
};
