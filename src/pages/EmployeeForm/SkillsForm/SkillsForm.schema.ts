import * as Yup from "yup";

export const skillFormModel = {
  skill: {
    name: "skill",
    label: "Skill*",
    requiredErrorMsg: "Skill is required",
    default: "",
  },
  proficiency: {
    name: "proficiency",
    label: "Proficiency*",
    requiredErrorMsg: "Proficiency is required",
    default: ""
  },
  primary: {
    name: "primary",
    label: "Primary Skill",
    default: false,
  }
};

export const skillsFormModel = [
    skillFormModel
  ]

const { skill, proficiency, primary } = skillFormModel;

const skillFormSchema = Yup.object({
  skill: Yup.string()
    .required(`${skill.requiredErrorMsg}`)
    .default(skill.default),
  proficiency: Yup.string()
  .required(`${proficiency.requiredErrorMsg}`)
  .default(proficiency.default),
  primary: Yup.boolean().default(primary.default),
}).required()

export const skillsFormSchema = Yup.array().of(skillFormSchema).required()

export type IEmployeeSkillForm = Yup.InferType<typeof skillsFormSchema>;

export const skillFormInitialValues =  skillFormSchema.cast();

export const skillsFormInitialValues: IEmployeeSkillForm = [
  skillFormInitialValues
];
