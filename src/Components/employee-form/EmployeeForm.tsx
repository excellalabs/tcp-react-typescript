import React, { useState } from "react";
import { Stepper, Step, StepLabel, Button } from "@material-ui/core";
import { Formik, Form } from "formik";

import { makeStyles } from "@material-ui/core/styles";
import StepContent from "@material-ui/core/StepContent";

import validationSchema from "./form-model/validationSchema";
import employeeFormModel from "./form-model/employeeFormModel";
import formInitialValues from "./form-model/formInitialValues";

import BioForm from "./BioForm";

const steps = ["Biological Information", "Contact Info", "Skills", "Review"];
const { formField } = employeeFormModel;
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

function getNextStep(step: number) {
  switch (step) {
    case 0:
      return <BioForm formField={formField} />;
    case 1:
      return "Contact info";
    case 2:
      return "Skills Info";
    case 3:
      return "Review";
    default:
      return <div>Not Found</div>;
  }
}

export default function CheckoutPage() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [formValues, setFormValues] = useState(formInitialValues);
  const currentValidationSchema = validationSchema[activeStep];
  const isLastStep = activeStep === steps.length - 1;

  async function submitForm(values: any, actions: any) {
    alert("You have completed the form!");
    actions.setSubmitting(false);

    setActiveStep(activeStep + 1);
  }

  function handleNext(values: any, actions: any) {
    if (isLastStep) {
      submitForm(values, actions);
    } else {
      setActiveStep(activeStep + 1);
      setFormValues(values);
      actions.setSubmitting(false);
    }
  }

  function handleBack() {
    setActiveStep(activeStep - 1);
  }

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Formik
                initialValues={formValues}
                validationSchema={currentValidationSchema}
                onSubmit={handleNext}
              >
                {({ isSubmitting }) => (
                  <Form>
                    {getNextStep(activeStep)}
                    <div>
                      {activeStep !== 0 && (
                        <Button onClick={handleBack}>Back</Button>
                      )}
                      <Button
                        disabled={isSubmitting}
                        type="submit"
                        variant="contained"
                        color="primary"
                      >
                        {isLastStep ? "Submit" : "Next"}
                      </Button>
                      {isSubmitting}
                    </div>
                  </Form>
                )}
              </Formik>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
