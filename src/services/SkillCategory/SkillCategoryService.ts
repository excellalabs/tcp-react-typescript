import { BaseCrudService, IBaseCrudService } from "../abstract/BaseCrudService";
import { ICategory } from "../../models/Skill.interface";

export interface ISkillCategoryService extends IBaseCrudService<ICategory> {}

export default class SkillCategoryService extends BaseCrudService<ICategory> {
  endpoint = "/skill-category";
}
