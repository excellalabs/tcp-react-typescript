import { Card, Grid } from "@material-ui/core";
import {
  IEmployeeBioForm,
  bioFormModel,
  bioFormSchema,
} from "./BioForm.schema";

import { Formik } from "formik";
import InputField from "../Components/InputField";
import React from "react";

const BioForm: React.FC<{initialValues: IEmployeeBioForm}> = (initialValues) => {
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
    <Formik initialValues={initialValues} validationSchema={bioFormSchema} onSubmit={() => {}}>
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
    </Formik>
  );
};

export default BioForm;
