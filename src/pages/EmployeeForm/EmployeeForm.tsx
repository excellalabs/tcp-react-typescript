import React, { useState } from "react";
import { Stepper, Step, StepButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import StepContent from "@material-ui/core/StepContent";

import BioForm from "./BioForm/BioForm";
import { initialValues } from "./EmployeeForm.schema";
import { IEmployeeBio } from "../../models/Employee.interface";
import { IEmployeeForm } from "./EmployeeForm.schema";

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
  const [formValues, setFormValues] = useState(initialValues); //will be replaced by EmployeeData

  function handleFormChange(newFormValues: IEmployeeForm) {
    setFormValues(newFormValues);
  }

  function handleNext() {
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
        console.log(formValues);
        return (
          <BioForm
            formValues={formValues}
            handleFormChange={handleFormChange}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        );
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
            <StepContent>{getNextStep(activeStep)}</StepContent>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default EmployeeForm;
