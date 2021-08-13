import React from 'react'
import { FormGroup, Label, TextInput } from '@trussworks/react-uswds'
import ShowErrorMessage, {
  hasError,
} from '../ShowErrorMessage/ShowErrorMessage'
import { ChangeEventHandler } from 'react'

const PasswordFormGroup: React.FC<{
  fieldName: string
  label: string
  errors: any
  touched: any
  values: any
  handleChange: ChangeEventHandler
  handleBlur: ChangeEventHandler
}> = ({
  fieldName,
  label,
  errors,
  touched,
  values,
  handleChange,
  handleBlur,
}) => {
  return (
    <FormGroup error={hasError(fieldName, errors, touched)}>
      <Label htmlFor="fieldName">{label}</Label>
      <TextInput
        id={fieldName}
        name={fieldName}
        type="password"
        value={values[fieldName]}
        onChange={handleChange}
        onBlur={handleBlur}
        error={hasError(fieldName, errors, touched)}
      />

      <ShowErrorMessage
        fieldName={fieldName}
        errors={errors}
        touched={touched}
      />
    </FormGroup>
  )
}

export default PasswordFormGroup
