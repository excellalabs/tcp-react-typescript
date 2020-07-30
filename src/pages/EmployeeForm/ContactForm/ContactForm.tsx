import { Box, Card, Grid } from "@material-ui/core";

import InputField from "../Components/InputField";
import React from "react";
import { addFormGroup } from "../../../helpers/FormGroup";
import { contactFormModel } from "./ContactForm.schema";

export const ContactForm: React.FC<{
  formGroup: string;
}> = ({ formGroup }) => {
  const { email } = contactFormModel;

  const withFormGroup = addFormGroup(formGroup);

  return (
    <Card data-testid="contactform">
      <Box p={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={5}>
            <InputField
              name={withFormGroup(email.name)}
              label={email.label}
              fullWidth
            />
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

export default ContactForm;
