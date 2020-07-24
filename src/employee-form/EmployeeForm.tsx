import React from "react";
import { useState } from "react";
import { Formik, Form } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";

import BioForm from "./BioForm";
import employeeFormModel from "./form-model/employeeFormModel";

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

function getSteps() {
  return ["Biographical Info", "Contact Info", "Skills", "Review"];
}

export default function EmployeeForm() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [isNotComplete, setIsNotComplete] = React.useState(true);
  const [formData, setFormData] = useState({
    employeeFormModel,
  });
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleSubmit = () => {
    console.log("DONE!");
  };

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return (
          <BioForm
            formData={formData}
            setFormData={setFormData}
            isComplete={setIsNotComplete}
          />
        );
      case 1:
        return "Contact form page";
      case 2:
        return "Skills info page";
      case 3:
        return "Review page";
      default:
        return "Unknown step";
    }
  }

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>

            <StepContent>
              <Card>{getStepContent(index)}</Card>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                    disabled={isNotComplete}
                  >
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
        </Paper>
      )}
    </div>
  );
}
