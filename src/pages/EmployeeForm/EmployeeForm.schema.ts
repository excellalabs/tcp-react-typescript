import * as Yup from "yup";
import { bioFormSchema } from "./BioForm/BioForm.schema";

export const employeeFormSchema = Yup.object().shape({
  bio: bioFormSchema.required().default(bioFormSchema.cast()),
});

export type IEmployeeForm = Yup.InferType<typeof employeeFormSchema>;

export const initialValues: IEmployeeForm = employeeFormSchema.cast();
