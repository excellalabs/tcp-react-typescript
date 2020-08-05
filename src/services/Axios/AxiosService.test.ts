import AxiosService from "./AxiosService";
import mockAxios from "../../__mocks__/axios";

jest.mock("../../__mocks__/axios");

const expectedToken =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJ1c2VyIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sImV4cCI6MTU5NjIxNTkyNywiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl0sImp0aSI6IjlhOGIwZjVhLTNjYTQtNGEzNC05MjFkLWYxYTM3M2EzM2U1MiIsImVtYWlsIjoiam9obkB3aW5jaGVzdGVyLmNvbSIsImNsaWVudF9pZCI6ImFwcCJ9.a9iNntI4eSrfbu_wR8E5d-Z9f46U-NLVpT7q3efqCwEpdm8UmBjLHXm25jFXTtfi2i1-crKBiW6qIfza-ATsjqZ_kzS3nofaX4cLyE9tr2Jw5u0m6dnzj0jn_iccbr5RYW-Jf9tvP8UaBf56PMfk2l0X__GkxrL2-mTHJDDZ2fY2GvRLLmDmyeb0YWzIFLEdujk7wUOv0-F64gmG7MtoiYZ0MNA6_exzYqc6CoMARWFiAZHeHUb4kYqIi_M1yhyBb8aoLTewezT1y08GNWBJSygH7zMBEZAMh4ar_7HhUyoxD2Msfbo6yExBaYUipZCsWWt9j02RFgd6vRawWBzeOQ";

beforeEach(() => {
  jest.spyOn(window.localStorage.__proto__, "removeItem");
  window.localStorage.__proto__.removeItem = jest.fn();
  jest.spyOn(window.localStorage.__proto__, "setItem");
  window.localStorage.__proto__.setItem = jest.fn();
  jest.spyOn(window.localStorage.__proto__, "getItem");
  window.localStorage.__proto__.getItem = jest.fn(() => {
    return expectedToken;
  });
});
describe("AxiosService", () => {
  describe("token functions", () => {
    it("can decode token and get values", async () => {
      const decodedToken = AxiosService.decodedToken();
      expect(decodedToken?.email).toBe("john@winchester.com");

      expect(AxiosService.tokenHasLifeLeft()).toBeFalsy();
    });
    it("returns a token on retrieveToken", () => {
      const token = AxiosService.retrieveToken();
      expect(token).toBe(
        "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJ1c2VyIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sImV4cCI6MTU5NjIxNTkyNywiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl0sImp0aSI6IjlhOGIwZjVhLTNjYTQtNGEzNC05MjFkLWYxYTM3M2EzM2U1MiIsImVtYWlsIjoiam9obkB3aW5jaGVzdGVyLmNvbSIsImNsaWVudF9pZCI6ImFwcCJ9.a9iNntI4eSrfbu_wR8E5d-Z9f46U-NLVpT7q3efqCwEpdm8UmBjLHXm25jFXTtfi2i1-crKBiW6qIfza-ATsjqZ_kzS3nofaX4cLyE9tr2Jw5u0m6dnzj0jn_iccbr5RYW-Jf9tvP8UaBf56PMfk2l0X__GkxrL2-mTHJDDZ2fY2GvRLLmDmyeb0YWzIFLEdujk7wUOv0-F64gmG7MtoiYZ0MNA6_exzYqc6CoMARWFiAZHeHUb4kYqIi_M1yhyBb8aoLTewezT1y08GNWBJSygH7zMBEZAMh4ar_7HhUyoxD2Msfbo6yExBaYUipZCsWWt9j02RFgd6vRawWBzeOQ"
      );
    });
  });

  describe("login", () => {
    it("posts to login", async () => {
      const service = new AxiosService();
      const expectedParams = [
        "/oauth/token?grant_type=password&username=user&password=pass&scope=read%20write",
        {},
        {
          baseURL: "http://localhost:8080/api",
          headers: {
            Accept: "*/*",
            Authorization:
              "Basic YXBwOiQyYSQwNCRocWF3QmxkTHNXa0ZKNUNWc3Z0TDdlZDF6OXllb2tuZnVzelBPRUhXenhmTEJvVmlLNk9WaQ==",
          },
        },
      ];
      service.login("user", "pass");

      expect(mockAxios.post).toHaveBeenCalledTimes(1);
      expect(mockAxios.post).toHaveBeenCalledWith(...expectedParams);
    });
  });
  describe("logout", () => {
    it("removes local storage on logout", () => {
      const service = new AxiosService();
      service.logout();
      expect(localStorage.removeItem).toHaveBeenCalled();
    });
  });
});
