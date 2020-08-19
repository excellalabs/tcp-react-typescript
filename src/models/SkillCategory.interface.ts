import { IBaseItem, BaseItem } from "./BaseItem.interface";

export interface ISkillCategory extends IBaseItem {
  name: string;
}

export class SkillCategory extends BaseItem {
  public name: string;
  constructor(skillCategory: ISkillCategory) {
    super(skillCategory.id);
    this.name = skillCategory.name;
  }
}
