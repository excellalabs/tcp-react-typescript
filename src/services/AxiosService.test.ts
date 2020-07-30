import axios, { AxiosStatic } from "axios";
import AxiosService from "./AxiosService";

const mockAxios = jest.genMockFromModule<AxiosStatic>("axios");

describe("AxiosService", () => {
  it("can post to an api", async () => {
    new AxiosService().login("user", "pass");
    expect(mockAxios).toBeDefined();
  });
});
