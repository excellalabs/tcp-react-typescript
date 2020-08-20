const mockAxios = jest.genMockFromModule("axios");
import fakeEmployee from "./data/employee";
import { reactSkill } from "./data/skill";

export const fakeAxiosData = [
  {
    id: 1,
    name: "Ice Cream",
    cost: 3,
  },
  {
    id: 2,
    name: "Cookies",
    cost: 2,
  },
  {
    id: 3,
    name: "Pie",
    cost: 4,
  },
];

// Returns the id passed to the endpoint or the endpoint name, items
const getId = (params) => {
  const endpoint = params.match(/\/items\/[0-9]+/);
  if (endpoint !== null) {
    const id = endpoint[0].match(/[0-9]/)[0];
    return id;
  }
  return null;
};

export default {
  get: jest.fn((params = "") => {
    if (params.includes("/employee")) {
      return Promise.resolve({ status: 200, data: [fakeEmployee] });
    }
    if (params.includes("/skill")) {
      return Promise.resolve({ status: 200, data: [reactSkill] });
    }
    const id = getId(params);

    const data = id === null ? fakeAxiosData : fakeAxiosData[id];

    return Promise.resolve({ data: data });
  }),
  post: jest.fn((params) => {
    if (params.match(/username=/)) {
      if (params.includes("username=user&password=pass&"))
        return Promise.resolve({ status: 200 });
      return Promise.resolve({ status: 400 });
    }
  }),
  put: jest.fn((params, body) => {
    return Promise.resolve({ data: body });
  }),
  delete: jest.fn((params) => {
    const id = getId(params);
    return Promise.resolve({ data: fakeAxiosData[id] });
  }),
  create: jest.fn(() => mockAxios),
};
