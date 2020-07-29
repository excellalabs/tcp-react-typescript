import * as Yup from "yup";
import { EmployeeFormModel } from "../EmployeeFormModel";

const {
  formField: { firstName, lastName, dob, ethnicity },
} = EmployeeFormModel;

export default Yup.object().shape({
  [firstName.name]: Yup.string().required(`${firstName.requiredErrorMsg}`),
  [lastName.name]: Yup.string().required(`${lastName.requiredErrorMsg}`),
  [dob.name]: Yup.string().required(`${dob.requiredErrorMsg}`),
  [ethnicity.name]: Yup.string().required(`${ethnicity.requiredErrorMsg}`),
});
