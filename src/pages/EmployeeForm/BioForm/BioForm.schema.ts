import * as Yup from "yup";
import moment from "moment";

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
    ageErrorMsg: "Employee must be 18 years old",
    default: "",
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

export const bioFormSchema = Yup.object({
  firstName: Yup.string()
    .required(`${firstName.requiredErrorMsg}`)
    .default(firstName.default),
  middleInitial: Yup.string().default(middleInitial.default),
  lastName: Yup.string()
    .required(`${lastName.requiredErrorMsg}`)
    .default(lastName.default),
  birthDate: Yup.date()
    .nullable()
    .required(`${birthDate.requiredErrorMsg}`)
    .test("birthDate", `${birthDate.ageErrorMsg}`, (value) => {
      return moment().diff(moment(value), "years") >= 18;
    })
    .default(birthDate.default),
  gender: Yup.string()
    .required(`${gender.requiredErrorMsg}`)
    .default(gender.default),
  ethnicity: Yup.string()
    .required(`${ethnicity.requiredErrorMsg}`)
    .default(ethnicity.default),
  isCitizen: Yup.boolean().default(isCitizen.default),
}).required();

export type IEmployeeBioForm = Yup.InferType<typeof bioFormSchema>;

export const bioFormInitialValues: IEmployeeBioForm = bioFormSchema.cast();
