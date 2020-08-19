import { BaseCrudService, IBaseCrudService } from "../abstract/BaseCrudService";
import { ISkillCategory } from "../../models/SkillCategory.interface";

export interface ISkillCategoryService
  extends IBaseCrudService<ISkillCategory> {}

export default class SkillCategoryService extends BaseCrudService<
  ISkillCategory
> {
  endpoint = "/skill-category/";
}
