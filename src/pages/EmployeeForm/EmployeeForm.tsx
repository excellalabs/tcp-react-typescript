import { Button, Step, StepButton, Stepper } from "@material-ui/core";
import { Form, Formik } from "formik";
import {
  IEmployeeForm,
  defaultValues,
  employeeFormSchema,
  bioEmployeeSchema,
  contactEmployeeSchema,
  skillsEmployeeSchema,
} from "./EmployeeForm.schema";
import React, { useState } from "react";

import { BioForm } from "./BioForm/BioForm";
import StepContent from "@material-ui/core/StepContent";
import { makeStyles } from "@material-ui/core/styles";
import ContactForm from "./ContactForm/ContactForm";
import SkillsForm from "./SkillsForm/SkillsForm";
import Review from "./Review/Review";
import {
  IEmployee,
  IEmployeeBio,
  GENDER,
  ETHNICITY,
} from "../../models/Employee.interface";
import useSkill from "../../hooks/UseSkill/UseSkill";
import { PROFICIENCY } from "../../models/Skill.interface";
import useEmployee from "../../hooks/UseEmployee/UseEmployee";
import { Redirect, useParams } from "react-router-dom";

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

  const { id } = useParams();

  const { createEmployee, getEmployeeFormDataById } = useEmployee();

  const [snapshot, setSnapshot] = useState<IEmployeeForm>(
    getEmployeeFormDataById(id)
  );

  const { skills: skillsList } = useSkill();

  type SubmitStatus = "pending" | "success" | "error";
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("pending");

  function formSchemaToIEmployee(values: IEmployeeForm): IEmployee {
    return ({
      bio: {
        firstName: values.bio.firstName,
        middleInitial: values.bio.middleInitial,
        lastName: values.bio.lastName,
        birthDate: values.bio.birthDate,
        gender: values.bio.gender as GENDER,
        ethnicity: values.bio.ethnicity as ETHNICITY,
        usCitizen: values.bio.usCitizen ?? false,
      },
      contact: {
        email: values.contact.email,
        phoneNumber: values.contact.phoneNumber,
        address: {
          line1: values.contact.address1,
          line2: values.contact.address2 ?? "",
          city: values.contact.city,
          stateCode: values.contact.state,
          zipCode: values.contact.zipCode,
        },
      },
      skills: values.skills.map((skill, count) => ({
        id: count,
        skill: skillsList.filter((i) => i.name === skill.skill)[0],
        proficiency: skill.proficiency as PROFICIENCY,
        primary: skill.primary ?? false,
      })),
    } as unknown) as IEmployee;
  }

  function handleNext(values: IEmployeeForm) {
    if (isLastStep) {
      createEmployee(formSchemaToIEmployee(values)).then((res) => {
        res.status === 200
          ? setSubmitStatus("success")
          : setSubmitStatus("error");
      });
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
        return <SkillsForm formGroup="skills" />; //placeholder
      case 3:
        return <Review />;
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
        return skillsEmployeeSchema; //placeholder
      case 3:
        return employeeFormSchema; //placeholder
      default:
        return <div>Not Found</div>;
    }
  }

  function handleStep(step: number) {
    setActiveStep(step);
  }

  if (submitStatus === "success") {
    return <Redirect to="/employee/list" />;
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
                      {submitStatus === "error" && (
                        <p>There was an error with the submission</p>
                      )}
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
