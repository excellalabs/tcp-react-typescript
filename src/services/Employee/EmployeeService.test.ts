import EmployeeService from "./EmployeeService";

describe("employeeService", () => {
  it("formats date properly", () => {
    const employeeService = new EmployeeService("token");
    expect(employeeService.formatDate(new Date("01/01/2000"))).toBe(
      "2000-01-01"
    );
    expect(employeeService.formatDate(new Date("12/30/1999"))).toBe(
      "1999-12-30"
    );
  });
});
