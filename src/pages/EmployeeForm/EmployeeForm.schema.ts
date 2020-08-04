import * as Yup from "yup";

import { bioFormSchema } from "./BioForm/BioForm.schema";
import { contactFormSchema } from "./ContactForm/ContactForm.schema";

export const employeeFormSchema = Yup.object({
  bio: bioFormSchema.required().default(bioFormSchema.cast()),
  contact: contactFormSchema.required().default(contactFormSchema.cast()),
}).required();

export const bioEmployeeSchema = Yup.object({
  bio: bioFormSchema.required().default(bioFormSchema.cast()),
});

export const contactEmployeeSchema = Yup.object({
  contact: contactFormSchema.required().default(contactFormSchema.cast()),
});

export type IEmployeeForm = Yup.InferType<typeof employeeFormSchema>;

export const defaultValues: IEmployeeForm = employeeFormSchema.cast();
