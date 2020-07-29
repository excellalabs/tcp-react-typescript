import React from "react";
import { Box, Card, Grid } from "@material-ui/core";
import CheckboxField from "../Components/CheckboxField";
import DatePickerField from "../Components/DatePickerField";
import InputField from "../Components/InputField";
import RadioButtonField from "../Components/RadioButtonField";
import SelectField from "../Components/SelectField";
import { addFormGroup } from "../../../helpers/FormGroup";
import { bioFormModel } from "./BioForm.schema";
import { ETHNICITY, GENDER } from "../../../models/Employee.interface";

export const BioForm: React.FC<{
  formGroup: string;
}> = ({ formGroup }) => {
  const {
    firstName,
    middleInitial,
    lastName,
    birthDate,
    gender,
    ethnicity,
    isCitizen,
  } = bioFormModel;

  const withFormGroup = addFormGroup(formGroup);

  return (
    <Card>
      <Box p={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={5}>
            <InputField
              name={withFormGroup(firstName.name)}
              label={firstName.label}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <InputField
              name={withFormGroup(middleInitial.name)}
              label={middleInitial.label}
              inputProps={{ maxLength: 1 }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <InputField
              name={withFormGroup(lastName.name)}
              label={lastName.label}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePickerField
              name={withFormGroup(birthDate.name)}
              label={birthDate.label}
              placeholder="01/01/1990"
              format="MM/dd/yyyy"
              views={["year", "month", "date"]}
              maxDate={new Date()}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <RadioButtonField
              name={withFormGroup(gender.name)}
              data={GENDER}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SelectField
              name={withFormGroup(ethnicity.name)}
              label={ethnicity.label}
              data={ETHNICITY}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CheckboxField
              label={isCitizen.label}
              name={withFormGroup(isCitizen.name)}
            />
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

export default BioForm;
