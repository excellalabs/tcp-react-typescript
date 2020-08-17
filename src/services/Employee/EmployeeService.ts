import { IEmployee } from "../../models/Employee.interface";
import { IBaseCrudService, BaseCrudService } from "../abstract/BaseCrudService";
import { IEmployeeSkill } from "../../models/Skill.interface";

export interface IEmployeeService extends IBaseCrudService<IEmployee> {
  getByEmail(email: string): Promise<IEmployee>;
}

export default class EmployeeService extends BaseCrudService<IEmployee>
  implements IEmployeeService {
  endpoint = "/employee/";

  async getByEmail(email: string) {
    const res = await this.get();
    return res.data.filter((item) => item.contact.email === email)[0];
  }

  async addSkill(employee: IEmployee, skill: IEmployeeSkill) {
    const updatedEmployee: IEmployee = {
      bio: employee.bio,
      contact: employee.contact,
      id: employee.id,
      skills: [...employee.skills, skill],
    };
    return this.update(updatedEmployee).then((res) => res.data);
  }
}
