import { Box, Card, Grid, Button } from '@material-ui/core'

import InputField from '../Components/InputField'
import React, { useState } from 'react'
import { addFormGroup } from '../../../helpers/FormGroup'
import { contactFormModel } from './ContactForm.schema'
import SelectField from '../Components/SelectField'
import { STATES } from '../../../models/Address.interface'

export const ContactForm: React.FC<{
  formGroup: string
}> = ({ formGroup }) => {
  const { address, phoneNumber, email } = contactFormModel
  const withFormGroup = addFormGroup(formGroup)
  const [isLineTwoVisible, setIsLineTwoVisible] = useState(false)

  function makeLineTwoVisible() {
    setIsLineTwoVisible(true)
  }

  return (
    <Card data-testid="contactform">
      <Box p={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <InputField
              name={withFormGroup(address.line1.name)}
              label={address.line1.label}
              fullWidth
            />
          </Grid>
          {!isLineTwoVisible && (
            <Grid item xs={12} sm={12}>
              <Button
                onClick={makeLineTwoVisible}
                style={{ fontWeight: 'bold' }}
              >
                + Add C/O, Apt, Suite, Unit
              </Button>
            </Grid>
          )}
          {isLineTwoVisible && (
            <Grid item xs={12} sm={12}>
              <InputField
                name={withFormGroup(address.line2.name)}
                label={address.line2.label}
                fullWidth
              />
            </Grid>
          )}
          <Grid item xs={12} sm={6}>
            <InputField
              name={withFormGroup(address.city.name)}
              label={address.city.label}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SelectField
              name={withFormGroup(address.state.name)}
              label={address.state.label}
              data={STATES}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <InputField
              name={withFormGroup(address.zipCode.name)}
              label={address.zipCode.label}
              type="text"
              inputProps={{ maxLength: 5 }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputField
              name={withFormGroup(phoneNumber.name)}
              label={phoneNumber.label}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputField
              name={withFormGroup(email.name)}
              label={email.label}
              fullWidth
            />
          </Grid>
        </Grid>
      </Box>
    </Card>
  )
}

export default ContactForm
