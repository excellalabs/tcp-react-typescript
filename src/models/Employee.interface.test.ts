import { ETHNICITY, Employee, GENDER, IEmployee } from "./Employee.interface";

const iEmployee: IEmployee = {
  id: 0,
  bio: {
    firstName: "Jane",
    middleInitial: "T",
    lastName: "Doe",
    birthDate: new Date("01/01/2000"),
    gender: GENDER.FEMALE,
    ethnicity: ETHNICITY.CAUCASIAN,
    usCitizen: true,
  },
  contact: {
    email: "jane.doe@fbi.gov",
    phoneNumber: "555-867-5309",
    address: {
      line1: "123 Main St",
      line2: "",
      city: "Anytown",
      stateCode: "MD",
      zipCode: "20212",
    },
  },
  skills: [],
};

describe("Employee (class)", () => {
  let employee: Employee;

  beforeEach(() => {
    employee = new Employee(iEmployee);
  });

  it("should flatten the provided IEmployee object", () => {
    expect(employee.firstName).toEqual(iEmployee.bio.firstName);
    expect(employee.lastName).toEqual(iEmployee.bio.lastName);
    expect(employee.email).toEqual(iEmployee.contact.email);
    expect(employee.skills.length).toBe(iEmployee.skills.length);
  });

  it("should have an id", () => {
    expect(employee.id).toBeDefined();
    expect(employee.id).toBe(iEmployee.id);
  });

  describe(".fullname", () => {
    it("should only have one psace between first and last name when no middle intitial", () => {
      employee.middleInitial = undefined;
      expect(employee.fullName).toEqual(
        `${iEmployee.bio.firstName} ${iEmployee.bio.lastName}`
      );
    });
    it("should include the middle initial if one is present", () => {
      employee.middleInitial = "T";
      expect(employee.fullName).toEqual(
        `${iEmployee.bio.firstName} ${iEmployee.bio.middleInitial} ${iEmployee.bio.lastName}`
      );
    });
  });

  describe("toJSON", () => {
    it("should return an iEmployee object", () => {
      expect(employee.toJSON()).toEqual(iEmployee);
    });
  });
});
