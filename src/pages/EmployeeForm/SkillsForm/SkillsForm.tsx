import { Box, Card, Grid, Button } from "@material-ui/core";

import InputField from "../Components/InputField";
import React, { useState } from "react";
import { addFormGroup } from "../../../helpers/FormGroup";
import { skillsFormModel, skillFormModel, skillFormInitialValues } from "./SkillsForm.schema";
import SelectField from "../Components/SelectField";
import { PROFICIENCY } from "../../../models/Skill.interface";
import CheckboxField from "../Components/CheckboxField";
import { FieldArray } from "formik";

export const ContactForm: React.FC<{
  formGroup: string;
}> = ({ formGroup }) => {
  const skills = skillsFormModel;
  const withFormGroup = addFormGroup(formGroup);

  function addSkill(arrayHelpers: any) {
    arrayHelpers.push(skillFormInitialValues)
    skills.push(skillFormModel);
  }

  function removeSkill(arrayHelpers: any,index: number) {
    arrayHelpers.remove(index)
    skills.pop();
  }
  return (
    <Card data-testid="contactform">
      <Box p={3}>
      <FieldArray
            name="skills"
            render={arrayHelpers => (
              <div>
                {skills.map((skill, index) => (
                <div key={index}>
                  <Grid container spacing={3}>
                    <Grid item xs={5} sm={5}>
                      <InputField
                        name={withFormGroup(`${index}.${skill.skill.name}`)}
                        label={skill.skill.label}
                        fullWidth
                      />          
                    </Grid>
                    <Grid item xs={3} sm={3}>
                      <SelectField
                        name={withFormGroup(`${index}.${skill.proficiency.name}`)}
                        label={skill.proficiency.label}
                        data={PROFICIENCY}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={3} sm={3}>
                      <CheckboxField
                        label={skill.primary.label}
                        name={withFormGroup(`${index}.${skill.primary.name}`)}
                      />
                    </Grid>
                    <Grid item xs={1} sm={1}>
                      <Button onClick={() => removeSkill(arrayHelpers, index)}>
                        -
                      </Button>
                    </Grid>
                  </Grid>
              </div>
              ))}
                <Button onClick={() => addSkill(arrayHelpers)}>
                  Add Skill
                </Button>
              </div>
            )}
        />

      </Box>
    </Card>
  );
};

export default ContactForm;
