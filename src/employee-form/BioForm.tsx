import React from "react";
import { Grid, Typography, Card } from "@material-ui/core";
import { InputField } from "./FormFields";

type BioFormSchema = {
  formField: {
    firstName: {
      name: string;
      label: string;
    };
    middleInitial: {
      name: string;
      label: string;
    };
    lastName: {
      name: string;
      label: string;
    };
    dob: {
      name: string;
      label: string;
    };
    gender: {
      name: string;
    };
    ethnicity: {
      name: string;
      label: string;
    };
    isCitizen: {
      name: string;
      label: string;
    };
  };
};

type BioFormProps = {
  formField: BioFormSchema;
};

const BioForm: React.FC<BioFormProps> = ({ formField }) => {
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
        <Grid item xs={12} sm={6}>
          <InputField name={dob.name} label={dob.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField name={gender.name} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField name={ethnicity.name} label={ethnicity.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField name={isCitizen.name} label={isCitizen.label} fullWidth />
        </Grid>
      </Grid>
    </Card>
  );
};

export default BioForm;
