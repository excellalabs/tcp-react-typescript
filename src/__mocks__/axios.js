const mockAxios = jest.genMockFromModule("axios");

export default {
  get: jest.fn(() => {
    Promise.resolve({ data: {} });
  }),
  post: jest.fn(() => {
    Promise.resolve({ data: {} });
  }),
  create: jest.fn(() => mockAxios),
};
