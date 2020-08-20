import { IEmployee } from "../../models/Employee.interface";
import { IBaseCrudService, BaseCrudService } from "../abstract/BaseCrudService";
import { IEmployeeSkill } from "../../models/Skill.interface";
import { AxiosResponse } from "axios";

export interface IEmployeeService extends IBaseCrudService<IEmployee> {
  getByEmail(email: string): Promise<IEmployee>;
}

export default class EmployeeService extends BaseCrudService<IEmployee>
  implements IEmployeeService {
  endpoint = "/employee/";

  private formatDate(date: Date): Date {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; //getMonth() returns 0-11 instead of 1-12
    const day = date.getDay();

    const prependZero = (val: number): string =>
      val < 10 ? `0${val}` : val.toString();

    return (`${year}-${prependZero(month)}-${prependZero(
      day
    )}` as unknown) as Date;
  }

  async getByEmail(email: string) {
    const res = await this.get();
    return res.data.filter((item) => item.contact.email === email)[0];
  }

  async create(employee: IEmployee): Promise<AxiosResponse<IEmployee>> {
    return super.create({
      bio: {
        ...employee.bio,
        birthDate: this.formatDate(employee.bio.birthDate),
      },
      contact: employee.contact,
      skills: employee.skills,
    } as IEmployee);
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
