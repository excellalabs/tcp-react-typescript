const mockAxios = jest.genMockFromModule("axios");

export default {
  get: jest.fn(() => {
    return Promise.resolve({ data: {} });
  }),
  post: jest.fn((params) => {
    if (params.includes("username=user&password=pass&"))
      return Promise.resolve({ status: 200 });
    return Promise.resolve({ status: 400 });
  }),
  create: jest.fn(() => mockAxios),
};
