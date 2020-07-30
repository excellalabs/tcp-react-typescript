import { Button, Step, StepButton, Stepper } from "@material-ui/core";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { defaultValues, employeeFormSchema } from "./EmployeeForm.schema";

import BioForm from "./BioForm/BioForm";
import { IEmployeeForm } from "./EmployeeForm.schema";
import StepContent from "@material-ui/core/StepContent";
import { bioFormSchema } from "./BioForm/BioForm.schema";
import { makeStyles } from "@material-ui/core/styles";

const steps = ["Biological Information", "Contact Info", "Skills", "Review"];
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

const EmployeeForm: React.FC<{ EmployeeData: IEmployeeForm }> = (
  EmployeeData
) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const isLastStep = activeStep === steps.length - 1;

  function handleNext(values: IEmployeeForm) {
    console.log(values);
    if (isLastStep) {
      alert("submitted!"); //placeholder
    } else {
      setActiveStep(activeStep + 1);
    }
  }

  function handleBack() {
    setActiveStep(activeStep - 1);
  }

  function getNextStep(step: number) {
    switch (step) {
      case 0:
        return <BioForm initialValues={defaultValues.bio} />;
      case 1:
        return "Contact info"; //placeholder
      case 2:
        return "Skills Info"; //placeholder
      case 3:
        return "Review"; //placeholder
      default:
        return <div>Not Found</div>;
    }
  }

  function getValidation(step: number) {
    switch (step) {
      case 0:
        return bioFormSchema;
      default:
        return employeeFormSchema;
      // case 1:
      //   return null; //placeholder
      // case 2:
      //   return null; //placeholder
      // case 3:
      //   return null;
    }
  }

  function handleStep(step: number) {
    setActiveStep(step);
  }

  console.log(defaultValues)

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
                initialValues = {defaultValues}
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
