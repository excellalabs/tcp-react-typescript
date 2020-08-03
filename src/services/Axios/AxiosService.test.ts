import axios, { AxiosStatic } from "axios";
import AxiosService from "./AxiosService";
import { DecodedJWT } from "./interfaces/ApiService.interface";

const mockAxios = jest.genMockFromModule<AxiosStatic>("axios");

describe("AxiosService", () => {
  it("can decode token and get values", async () => {
    localStorage.setItem(
      AxiosService.key,
      "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJ1c2VyIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sImV4cCI6MTU5NjIxNTkyNywiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl0sImp0aSI6IjlhOGIwZjVhLTNjYTQtNGEzNC05MjFkLWYxYTM3M2EzM2U1MiIsImVtYWlsIjoiam9obkB3aW5jaGVzdGVyLmNvbSIsImNsaWVudF9pZCI6ImFwcCJ9.a9iNntI4eSrfbu_wR8E5d-Z9f46U-NLVpT7q3efqCwEpdm8UmBjLHXm25jFXTtfi2i1-crKBiW6qIfza-ATsjqZ_kzS3nofaX4cLyE9tr2Jw5u0m6dnzj0jn_iccbr5RYW-Jf9tvP8UaBf56PMfk2l0X__GkxrL2-mTHJDDZ2fY2GvRLLmDmyeb0YWzIFLEdujk7wUOv0-F64gmG7MtoiYZ0MNA6_exzYqc6CoMARWFiAZHeHUb4kYqIi_M1yhyBb8aoLTewezT1y08GNWBJSygH7zMBEZAMh4ar_7HhUyoxD2Msfbo6yExBaYUipZCsWWt9j02RFgd6vRawWBzeOQ"
    );

    const decodedToken = AxiosService.decodedToken();
    expect(decodedToken?.email).toBe("john@winchester.com");

    expect(AxiosService.tokenHasLifeLeft()).toBeFalsy();
  });
});
