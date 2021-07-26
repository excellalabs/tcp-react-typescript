import { Box, Button, Card, Grid } from "@material-ui/core";
import { FieldArray, useFormikContext } from "formik";
import { skillFormInitialValues, skillFormModel } from "./SkillsForm.schema";

import CheckboxField from "../Components/CheckboxField";
import { IEmployeeForm } from "../EmployeeForm.schema";
import InputField from "../Components/InputField";
import { PROFICIENCY } from "../../../models/Skill.interface";
import React from "react";
import SelectField from "../Components/SelectField";
import addFormGroup from "../../../helpers/FormGroup";

export const SkillsForm: React.FC<{
  formGroup: keyof IEmployeeForm;
}> = ({ formGroup }) => {
  // Watch for changes to the Formik values, to enbale proper rendering of the list
  const { values } = useFormikContext<IEmployeeForm>();
  const skillList = ((formGroup
    ? values[formGroup] // Argh, Typescript....
    : values) as unknown) as typeof skillFormModel[];

  const withFormGroup = addFormGroup(formGroup);

  return (
    <Card data-testid="skillsform">
      <Box p={3}>
        <FieldArray
          name={formGroup}
          render={(arrayHelpers) => (
            <div>
              {skillList.map((skill, index) => (
                <div key={index}>
                  <Grid container spacing={3}>
                    <Grid item xs={5} sm={5}>
                      <InputField
                        name={withFormGroup(
                          `${index}.${skillFormModel.skill.name}`
                        )}
                        label={skillFormModel.skill.label}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={3} sm={3}>
                      <SelectField
                        name={withFormGroup(
                          `${index}.${skillFormModel.proficiency.name}`
                        )}
                        label={skillFormModel.proficiency.label}
                        data={PROFICIENCY}
                        fullWidth

                      />
                    </Grid>
                    <Grid item xs={3} sm={3}>
                      <CheckboxField
                        name={withFormGroup(
                          `${index}.${skillFormModel.primary.name}`
                        )}
                        label={skillFormModel.primary.label}
                      />
                    </Grid>
                    <Grid item xs={1} sm={1}>
                      <Button onClick={() => arrayHelpers.remove(index)}>
                        -
                      </Button>
                    </Grid>
                  </Grid>
                </div>
              ))}
              <Button
                variant="contained"
                color="primary"
                onClick={() => arrayHelpers.push(skillFormInitialValues)}
              >
                Add Skill
              </Button>
            </div>
          )}
        />
      </Box>
    </Card>
  );
};

export default SkillsForm;
