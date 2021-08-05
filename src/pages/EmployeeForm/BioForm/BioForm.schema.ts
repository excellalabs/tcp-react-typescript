import * as Yup from "yup";
import differenceInYears from 'date-fns/differenceInYears'

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
    requiredErrorMsg: "Date of birth is required",
    ageErrorMsg: "Employee must be 18 years old",
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
  usCitizen: {
    name: "usCitizen",
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
  usCitizen,
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
      return value ? differenceInYears(new Date(), value) >= 18 : false;
    }),
  gender: Yup.string()
    .required(`${gender.requiredErrorMsg}`)
    .default(gender.default),
  ethnicity: Yup.string()
    .required(`${ethnicity.requiredErrorMsg}`)
    .default(ethnicity.default),
  usCitizen: Yup.boolean().default(usCitizen.default),
}).required();

export type IEmployeeBioForm = Yup.InferType<typeof bioFormSchema>;

export const bioFormInitialValues: IEmployeeBioForm = bioFormSchema.cast();
