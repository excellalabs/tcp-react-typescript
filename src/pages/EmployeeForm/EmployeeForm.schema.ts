import * as Yup from "yup";

import { bioFormSchema } from "./BioForm/BioForm.schema";
import { contactFormSchema } from "./ContactForm/ContactForm.schema";
import { skillsFormSchema, skillsFormInitialValues } from "./SkillsForm/SkillsForm.schema";

export const employeeFormSchema = Yup.object({
  bio: bioFormSchema.required().default(bioFormSchema.cast()),
  contact: contactFormSchema.required().default(contactFormSchema.cast()),
  skills: skillsFormSchema.required().default(skillsFormInitialValues)
}).required();

export const bioEmployeeSchema = Yup.object({
  bio: bioFormSchema.required().default(bioFormSchema.cast()),
});

export const contactEmployeeSchema = Yup.object({
  contact: contactFormSchema.required().default(contactFormSchema.cast()),
});

export const skillsEmployeeSchema = Yup.object({
  skills: skillsFormSchema.required().default(skillsFormInitialValues),
});

export type IEmployeeForm = Yup.InferType<typeof employeeFormSchema>;

export const defaultValues: IEmployeeForm = employeeFormSchema.cast();
