import React, { useState } from "react";
import { Grid, Card, Button } from "@material-ui/core";
import InputField from "../Components/InputField";
import {
  bioFormSchema,
  bioFormInitialValues,
  bioFormModel,
} from "./BioForm.schema";

const BioForm: React.FC<{}> = () => {
  const {
    firstName,
    middleInitial,
    lastName,
    birthDate,
    gender,
    ethnicity,
    isCitizen,
  } = bioFormModel;

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
          <InputField name={birthDate.name} label={birthDate.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* Will be updated with correct field type */}
          <InputField name={gender.name} label={"gender"} fullWidth />
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
