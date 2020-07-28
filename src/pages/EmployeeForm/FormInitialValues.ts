import { EmployeeFormModel } from "./EmployeeFormModel";

const {
  formField: {
    firstName,
    middleInitial,
    lastName,
    dob,
    gender,
    ethnicity,
    isCitizen,
  },
} = EmployeeFormModel;

export default {
  [firstName.name]: "",
  [middleInitial.name]: "",
  [lastName.name]: "",
  [dob.name]: "",
  [gender.name]: "",
  [ethnicity.name]: "",
  [isCitizen.name]: "",
};
