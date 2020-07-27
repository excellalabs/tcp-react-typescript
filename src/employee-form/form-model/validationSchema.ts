import * as Yup from "yup";
import employeeFormModel from "./employeeFormModel";

const {
  formField: { firstName, lastName, dob, ethnicity },
} = employeeFormModel;

export default [
  Yup.object().shape({
    [firstName.name]: Yup.string().required(`${firstName.requiredErrorMsg}`),
    [lastName.name]: Yup.string().required(`${lastName.requiredErrorMsg}`),
    [dob.name]: Yup.string().required(`${dob.requiredErrorMsg}`),
    [ethnicity.name]: Yup.string().required(`${ethnicity.requiredErrorMsg}`),
  }),
];
