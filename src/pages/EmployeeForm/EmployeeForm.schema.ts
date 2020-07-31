import * as Yup from "yup";

import { bioFormSchema } from "./BioForm/BioForm.schema";

export const employeeFormSchema = Yup.object({
  bio: bioFormSchema.required().default(bioFormSchema.cast()),
}).required();

export type IEmployeeForm = Yup.InferType<typeof employeeFormSchema>;

export const defaultValues: IEmployeeForm = employeeFormSchema.cast();
