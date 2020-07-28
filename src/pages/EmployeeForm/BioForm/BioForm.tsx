import React from "react";
import { Card, Grid } from "@material-ui/core";
import SelectField from "../Components/SelectField";
import InputField from "../Components/InputField";
import { addFormGroup } from "../../../helpers/FormGroup";
import { bioFormModel } from "./BioForm.schema";
import { ETHNICITY } from "../../../models/Employee.interface";

export const BioForm: React.FC<{
  formGroup: string;
}> = ({ formGroup }) => {
  const {
    firstName,
    middleInitial,
    lastName,
    birthDate,
    gender,
    ethnicity,
    isCitizen,
  } = bioFormModel;

  const withFormGroup = addFormGroup(formGroup);

  return (
    <Card>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={5}>
          <InputField
            name={withFormGroup(firstName.name)}
            label={firstName.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <InputField
            name={withFormGroup(middleInitial.name)}
            label={middleInitial.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          <InputField
            name={withFormGroup(lastName.name)}
            label={lastName.label}
            fullWidth
          />
        </Grid>
        {/* Will be updated with correct field type */}
        <Grid item xs={12} sm={6}>
          <InputField
            name={withFormGroup(birthDate.name)}
            label={birthDate.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* Will be updated with correct field type */}
          <InputField
            name={withFormGroup(gender.name)}
            label={"gender"}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectField
            name={withFormGroup(ethnicity.name)}
            label={ethnicity.label}
            data={ETHNICITY}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* Will be updated with correct field type */}
          <InputField
            name={withFormGroup(isCitizen.name)}
            label={isCitizen.label}
            fullWidth
          />
        </Grid>
      </Grid>
    </Card>
  );
};

export default BioForm;
