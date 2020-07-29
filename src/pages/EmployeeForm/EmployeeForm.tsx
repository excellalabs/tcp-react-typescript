import React, { useState } from "react";
import { Stepper, Step, Button, StepButton } from "@material-ui/core";
import { Formik, Form } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import StepContent from "@material-ui/core/StepContent";

import { EmployeeFormModel } from "./EmployeeFormModel";
import formInitialValues from "./FormInitialValues";
import BioForm from "./BioForm/BioForm";
import BioFormSchema from "./BioForm/BioForm.schema";

const steps = ["Biological Information", "Contact Info", "Skills", "Review"];
const { formField } = EmployeeFormModel;
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

function getValidation(step: number) {
  switch (step) {
    case 0:
      return BioFormSchema;
    case 1:
      return null; //placeholder
    case 2:
      return null; //placeholder
    case 3:
      return null;
  }
}

const EmployeeForm: React.FC<any> = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [formValues, setFormValues] = useState(formInitialValues);
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
      setFormValues(values);
      setActiveStep(activeStep + 1);
      actions.setSubmitting(false);
    }
  }

  function handleBack() {
    setActiveStep(activeStep - 1);
  }

  function handleStep(step: number) {
    setActiveStep(step);
  }

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label: string, index: number) => (
          <Step key={label}>
            <StepButton
              onClick={() => handleStep(index)}
              data-testid={label + `-button`}
            >
              {label}
            </StepButton>
            <StepContent>
              <Formik
                initialValues={formValues}
                validationSchema={getValidation(activeStep)}
                onSubmit={handleNext}
              >
                {({ isSubmitting }) => (
                  <Form data-testid={label + `-content`}>
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
};

export default EmployeeForm;
