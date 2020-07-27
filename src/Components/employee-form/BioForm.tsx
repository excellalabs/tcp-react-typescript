import React from "react";
import { Grid, Card } from "@material-ui/core";
import InputField from "./form-fields/InputField";
import employeeFormModelInterface from "./form-model/employeeFormModelInterface";

const BioForm: React.FC<employeeFormModelInterface> = ({ formField }) => {
  const {
    firstName,
    middleInitial,
    lastName,
    dob,
    gender,
    ethnicity,
    isCitizen,
  } = formField;
  return (
    <Card>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={5}>
          <InputField name={firstName.name} label={firstName.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={2}>
          <InputField
            name={middleInitial.name}
            label={middleInitial.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          <InputField name={lastName.name} label={lastName.label} fullWidth />
        </Grid>
        {/* Will be updated with correct field type */}
        <Grid item xs={12} sm={6}>
          <InputField name={dob.name} label={dob.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* Will be updated with correct field type */}
          <InputField name={gender.name} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* Will be updated with correct field type */}
          <InputField name={ethnicity.name} label={ethnicity.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* Will be updated with correct field type */}
          <InputField name={isCitizen.name} label={isCitizen.label} fullWidth />
        </Grid>
      </Grid>
    </Card>
  );
};

export default BioForm;
