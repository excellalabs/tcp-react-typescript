import { Button, Step, StepButton, Stepper } from '@material-ui/core'
import { ETHNICITY, GENDER, IEmployee } from '../../models/Employee.interface'
import { Form, Formik } from 'formik'
import {
  IEmployeeForm,
  bioEmployeeSchema,
  contactEmployeeSchema,
  defaultValues,
  employeeFormSchema,
  skillsEmployeeSchema,
} from './EmployeeForm.schema'
import { ISkill, PROFICIENCY } from '../../models/Skill.interface'
import React, { useEffect, useState } from 'react'

import { BioForm } from './BioForm/BioForm'
import ContactForm from './ContactForm/ContactForm'
import Review from './Review/Review'
import SkillsForm from './SkillsForm/SkillsForm'
import StepContent from '@material-ui/core/StepContent'
import { makeStyles } from '@material-ui/core/styles'
import useSkill from '../../hooks/UseSkill/UseSkill'

const steps = ['Biological Information', 'Contact Info', 'Skills', 'Review']
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
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
}))

export function formSchemaToIEmployee(
  values: IEmployeeForm,
  skillsList: ISkill[]
): IEmployee {
  return {
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
        line2: values.contact.address2 ?? '',
        city: values.contact.city,
        stateCode: values.contact.state,
        zipCode: values.contact.zipCode,
      },
    },
    skills: values.skills.map((skill, index) => ({
      id: index,
      skill: skillsList.find((i) => i.name === skill.skill),
      proficiency: skill.proficiency as PROFICIENCY,
      primary: skill.primary ?? false,
    })),
  } as IEmployee
}

export type EmployeeFormProps = {
  employeeData: IEmployeeForm
  submitEmployee: (employee: IEmployee) => void
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({
  employeeData = defaultValues,
  submitEmployee,
}) => {
  const classes = useStyles()

  // Wizard management / form state
  const [activeStep, setActiveStep] = useState(0)
  const isLastStep = activeStep === steps.length - 1

  // API data and helpers
  const { skills: skillsList } = useSkill()

  // Form Data snapshot
  const [snapshot, setSnapshot] = useState<IEmployeeForm>(employeeData)

  // Update form with data passed in from parent (Editing)
  useEffect(() => {
    setSnapshot(employeeData)
  }, [employeeData])

  // Event Handlers
  function handleNext(values: IEmployeeForm) {
    if (isLastStep) {
      submitEmployee(formSchemaToIEmployee(values, skillsList))
    } else {
      setSnapshot(values)
      setActiveStep(activeStep + 1)
    }
  }

  function handleBack(values: IEmployeeForm) {
    setSnapshot(values)
    setActiveStep(activeStep - 1)
  }

  function getNextStep(step: number) {
    switch (step) {
      case 0:
        return <BioForm formGroup="bio" />
      case 1:
        return <ContactForm formGroup="contact" />
      case 2:
        return <SkillsForm formGroup="skills" /> //placeholder
      case 3:
        return <Review />
      default:
        return <div>Not Found</div>
    }
  }

  function getValidation(step: number) {
    switch (step) {
      case 0:
        return bioEmployeeSchema
      case 1:
        return contactEmployeeSchema
      case 2:
        return skillsEmployeeSchema //placeholder
      case 3:
        return employeeFormSchema //placeholder
      default:
        return <div>Not Found</div>
    }
  }

  function handleStep(step: number) {
    setActiveStep(step)
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
                enableReinitialize={true}
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
                        {isLastStep ? 'Submit' : 'Next'}
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
  )
}

export default EmployeeForm
