import React from 'react'
import { ErrorMessage } from '@trussworks/react-uswds'

const hasError = (fieldName: string, errors: any, touched: any) =>
  touched[fieldName] && !!errors[fieldName]

const ShowErrorMessage: React.FC<{
  fieldName: string
  errors: any
  touched: any
}> = ({ fieldName, errors, touched }) =>
  hasError(fieldName, errors, touched) ? (
    <ErrorMessage>{errors[fieldName]}</ErrorMessage>
  ) : null

export { hasError }
export default ShowErrorMessage
