import { Button, Step, StepButton, Stepper } from "@material-ui/core";
import { Form, Formik } from "formik";
import {
  IEmployeeForm,
  defaultValues,
  employeeFormSchema,
  bioEmployeeSchema,
  contactEmployeeSchema,
} from "./EmployeeForm.schema";
import React, { useState } from "react";

import { BioForm } from "./BioForm/BioForm";
import StepContent from "@material-ui/core/StepContent";
import { makeStyles } from "@material-ui/core/styles";
import ContactForm from "./ContactForm/ContactForm";

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

const EmployeeForm: React.FC<{ employeeFormData: IEmployeeForm }> = ({
  employeeFormData = defaultValues,
}) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const isLastStep = activeStep === steps.length - 1;
  const [snapshot, setSnapshot] = useState(employeeFormData);

  function handleNext(values: IEmployeeForm) {
    if (isLastStep) {
      alert("submitted!"); //placeholder
    } else {
      setSnapshot(values);
      setActiveStep(activeStep + 1);
    }
  }

  function handleBack(values: IEmployeeForm) {
    setSnapshot(values);
    setActiveStep(activeStep - 1);
  }

  function getNextStep(step: number) {
    switch (step) {
      case 0:
        return <BioForm formGroup="bio" />;
      case 1:
        return <ContactForm formGroup="contact" />;
      case 2:
        return "Skills Info Here"; //placeholder
      case 3:
        return "Review Here"; //placeholder
      default:
        return <div>Not Found</div>;
    }
  }

  function getValidation(step: number) {
    switch (step) {
      case 0:
        return bioEmployeeSchema;
      case 1:
        return contactEmployeeSchema;
      case 2:
        return employeeFormSchema; //placeholder
      case 3:
        return employeeFormSchema; //placeholder
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
            <StepContent>
              <Formik
                initialValues={snapshot}
                validationSchema={getValidation(activeStep)}
                onSubmit={handleNext}
              >
                {(formik) => (
                  <Form data-testid={activeStep + `-form`}>
                    {getNextStep(activeStep)}
                    <div>
                      {activeStep !== 0 && (
                        <Button onClick={() => handleBack(formik.values)}>
                          Back
                        </Button>
                      )}
                      <Button type="submit" variant="contained" color="primary">
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
