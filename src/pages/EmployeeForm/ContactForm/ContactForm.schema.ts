import * as Yup from "yup";

export const contactFormModel = {
  email: {
    name: "email",
    label: "Email*",
    requiredErrorMsg: "Email is required",
    default: "asdf",
  },
};

const { email } = contactFormModel;

export const contactFormSchema = Yup.object({
  email: Yup.string()
    .required(`${email.requiredErrorMsg}`)
    .default(email.default),
}).required();

export type IEmployeeContactForm = Yup.InferType<typeof contactFormSchema>;

export const bioFormInitialValues: IEmployeeContactForm = contactFormSchema.cast();
