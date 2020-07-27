import checkoutFormModel from "./checkoutFormModel";
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
} = checkoutFormModel;

export default {
  [firstName.name]: "",
  [middleInitial.name]: "",
  [lastName.name]: "",
  [dob.name]: "",
  [gender.name]: "",
  [ethnicity.name]: "",
  [isCitizen.name]: "",
};
