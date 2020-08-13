import { agileSkillCategory, techSkillCategory } from "./category";

import { ISkill } from "../../models/Skill.interface";

export const scrumMasterSkill: ISkill = {
  id: 0,
  name: "Scrum Master",
  category: agileSkillCategory,
};
export const reactSkill: ISkill = {
  id: 1,
  name: "React",
  category: techSkillCategory,
};
export const javaSkill: ISkill = {
  id: 2,
  name: "Java",
  category: techSkillCategory,
};

export const skills = [scrumMasterSkill, reactSkill, javaSkill];

export default skills;
