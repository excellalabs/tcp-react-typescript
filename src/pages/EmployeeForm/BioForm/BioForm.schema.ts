import * as Yup from "yup";
import {
  IEmployeeBio,
  GENDER,
  ETHNICITY,
} from "../../../models/Employee.interface";

export const initialValues: IEmployeeBio = {
  firstName: "",
  middleInitial: "",
  lastName: "",
  birthDate: new Date(),
  gender: GENDER.OTHER,
  ethnicity: ETHNICITY.DECLINED,
  isCitizen: false,
};

export const model = {
  firstName: {
    name: "firstName",
    label: "First name*",
    requiredErrorMsg: "First name is required",
  },
  middleInitial: {
    name: "middleInitial",
    label: "Middle Initial",
  },
  lastName: {
    name: "lastName",
    label: "Last name*",
    requiredErrorMsg: "Last name is required",
  },
  birthDate: {
    name: "birthDate",
    label: "Date of Birth*",
    requiredErrorMsg: "Date of Birth is required",
  },
  gender: {
    name: "gender",
  },
  ethnicity: {
    name: "ethnicity",
    label: "Ethnicity*",
    requiredErrorMsg: "Ethnicity is required",
  },
  isCitizen: {
    name: "isCitizen",
    label: "US Citizen",
  },
};

const { firstName, lastName, birthDate, ethnicity } = model;

export const validation = Yup.object().shape({
  [firstName.name]: Yup.string().required(`${firstName.requiredErrorMsg}`),
  [lastName.name]: Yup.string().required(`${lastName.requiredErrorMsg}`),
  [birthDate.name]: Yup.date().required(`${birthDate.requiredErrorMsg}`),
  [ethnicity.name]: Yup.string().required(`${ethnicity.requiredErrorMsg}`),
});
