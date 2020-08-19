import { IBaseItem, BaseItem } from "./BaseItem.interface";

// Maps Employee to skill, with additional data
export interface IEmployeeSkill extends IBaseItem {
  skill: ISkill;
  proficiency: PROFICIENCY;
  primary: boolean;
}

export interface ISkill extends IBaseItem {
  // Managed by Admin
  name: string;
  category: ICategory;
}

export function displaySkillFn(skill: ISkill): string | undefined {
  return skill ? `${skill.name} (${skill.category.name})` : undefined;
}

export interface ICategory extends IBaseItem {
  // Managed by Admin
  name: string;
}

// Basic Enum, not managed by Admin
export enum PROFICIENCY {
  LOW = "LOW",
  MID = "MID",
  HIGH = "HIGH",
}

export class Skill extends BaseItem {
  public name: string;
  public category: ICategory;
  constructor(skill: ISkill) {
    super(skill.id);
    this.name = skill.name;
    this.category = skill.category;
  }
  toJson(): ISkill {
    return {
      id: this.id,
      name: this.name,
      category: this.category,
    };
  }
}
