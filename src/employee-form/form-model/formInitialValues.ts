import employeeFormModel from "./employeeFormModel";
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
} = employeeFormModel;

export default {
  [firstName.name]: "",
  [middleInitial.name]: "",
  [lastName.name]: "",
  [dob.name]: "",
  [gender.name]: "",
  [ethnicity.name]: "",
  [isCitizen.name]: "",
};
