import * as Yup from "yup";
import {
  IEmployeeBio,
  GENDER,
  ETHNICITY,
} from "../../../models/Employee.interface";

export const bioFormModel = {
  firstName: {
    name: "firstName",
    label: "First name*",
    requiredErrorMsg: "First name is required",
    default: "",
  },
  middleInitial: {
    name: "middleInitial",
    label: "Middle Initial",
    default: "",
  },
  lastName: {
    name: "lastName",
    label: "Last name*",
    requiredErrorMsg: "Last name is required",
    default: "",
  },
  birthDate: {
    name: "birthDate",
    label: "Date of Birth*",
    requiredErrorMsg: "Date of Birth is required",
    default: new Date(),
  },
  gender: {
    name: "gender",
    requiredErrorMsg: "Gender is required",
    default: "",
  },
  ethnicity: {
    name: "ethnicity",
    label: "Ethnicity*",
    requiredErrorMsg: "Ethnicity is required",
    default: "",
  },
  isCitizen: {
    name: "isCitizen",
    label: "US Citizen",
    default: false,
  },
};

const {
  firstName,
  middleInitial,
  lastName,
  birthDate,
  gender,
  ethnicity,
  isCitizen,
} = bioFormModel;

export const bioFormSchema = Yup.object().shape({
  firstName: Yup.string()
    .required(`${firstName.requiredErrorMsg}`)
    .default(firstName.default),
  middleInitial: Yup.string().required().default(middleInitial.default),
  lastName: Yup.string()
    .required(`${lastName.requiredErrorMsg}`)
    .default(lastName.default),
  birthDate: Yup.date()
    .required(`${birthDate.requiredErrorMsg}`)
    .default(birthDate.default),
  gender: Yup.string()
    .required(`${gender.requiredErrorMsg}`)
    .default(gender.default),
  ethnicity: Yup.string()
    .required(`${ethnicity.requiredErrorMsg}`)
    .default(ethnicity.default),
  isCitizen: Yup.boolean().required().default(isCitizen.default),
});

export type IEmployeeBioForm = Yup.InferType<typeof bioFormSchema>;

export const bioFormInitialValues: IEmployeeBioForm = bioFormSchema.cast();
