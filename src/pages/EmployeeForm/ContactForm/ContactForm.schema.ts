import * as Yup from "yup";

export const contactFormModel = {
  email: {
    name: "email",
    label: "Email*",
    requiredErrorMsg: "Email is required",
    default: "",
  },
  phoneNumber: {
    name: "middleInitial",
    label: "Middle Initial",
    requiredErrorMsg: "Phone number is required",
    default: "",
  },
  address: {
    line1: {
      name: "address1",
      label: "Address*",
      requiredErrorMsg: "Address is required",
      default: "",
    },
    line2: {
      name: "address2",
      label: "Address 2",
      default: "",
    },
    city: {
      name: "city",
      label: "City*",
      requiredErrorMsg: "City is required",
      default: "",
    },
    state: {
      name: "state",
      label: "State*",
      requiredErrorMsg: "State is required",
      default: "",
    },
    zipCode: {
      name: "zipCode",
      label: "Zip Code*",
      requiredErrorMsg: "Zip code is required",
      default: "",
    },
  },
};

const { email, phoneNumber, address } = contactFormModel;

export const contactFormSchema = Yup.object({
  email: Yup.string()
    .required(`${email.requiredErrorMsg}`)
    .default(email.default),
  phoneNumber: Yup.string()
    .required(`${phoneNumber.requiredErrorMsg}`)
    .default(phoneNumber.default),
  address: Yup.object({
    line1: Yup.string()
      .required(`${address.line1.requiredErrorMsg}`)
      .default(address.line1.default),
    line2: Yup.string().default(address.line2.default),
    city: Yup.string()
      .required(`${address.city.requiredErrorMsg}`)
      .default(address.city.default),
    state: Yup.string()
      .required(`${address.state.requiredErrorMsg}`)
      .default(address.state.default),
    zipCode: Yup.string()
      .required(`${address.zipCode.requiredErrorMsg}`)
      .default(address.zipCode.default),
  }),
}).required();

export type IEmployeeContactForm = Yup.InferType<typeof contactFormSchema>;

export const contactFormInitialValues: IEmployeeContactForm = contactFormSchema.cast();
