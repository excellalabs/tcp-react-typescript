import React, { useState } from "react";
import { Grid, Card, Button } from "@material-ui/core";
import InputField from "../Components/InputField";
import { Formik, Form } from "formik";
import { IEmployeeBio } from "../../../models/Employee.interface";
import { validation, initialValues, model } from "./BioForm.schema";

type BioFormProps = {
  formValues: IEmployeeBio;
  handleFormChange: (values: IEmployeeBio) => void;
  handleNext: () => void;
  handleBack: () => void;
};

const BioForm: React.FC<BioFormProps> = ({
  formValues,
  handleFormChange,
  handleNext,
  handleBack,
}) => {
  const {
    firstName,
    middleInitial,
    lastName,
    birthDate,
    gender,
    ethnicity,
    isCitizen,
  } = model;

  const [isFormComplete, setIsFormComplete] = useState(false);

  function checkCompletion(errors: any) {
    if (formValues === initialValues || errors !== null) {
      setIsFormComplete(false);
    }
    setIsFormComplete(true);
  }

  function handleSubmit(values: any, actions: any) {
    handleFormChange(values);
    handleNext();
  }

  return (
    <Formik
      initialValues={formValues}
      validationSchema={validation}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, validateField, validateForm }) => (
        <Form onChange={() => checkCompletion(errors)}>
          <Card>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={5}>
                <InputField
                  name={firstName.name}
                  label={firstName.label}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <InputField
                  name={middleInitial.name}
                  label={middleInitial.label}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <InputField
                  name={lastName.name}
                  label={lastName.label}
                  fullWidth
                />
              </Grid>
              {/* Will be updated with correct field type */}
              <Grid item xs={12} sm={6}>
                <InputField
                  name={birthDate.name}
                  label={birthDate.label}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                {/* Will be updated with correct field type */}
                <InputField name={gender.name} label={"gender"} fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                {/* Will be updated with correct field type */}
                <InputField
                  name={ethnicity.name}
                  label={ethnicity.label}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                {/* Will be updated with correct field type */}
                <InputField
                  name={isCitizen.name}
                  label={isCitizen.label}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Card>
          <Button disabled={true} onClick={handleBack}>
            Back
          </Button>
          <Button
            // disabled={!isFormComplete}; can be finished when another form is present
            variant="contained"
            color="primary"
            type="submit"
          >
            Next
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default BioForm;
