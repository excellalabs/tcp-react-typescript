import React from 'react'
import { at } from 'lodash'
import { useField } from 'formik'
import {
  FormControl,
  FormHelperText,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core'

function RadioButtonField(props: any) {
  const { label, data, ...rest } = props
  const [field, meta] = useField(props)
  const [touched, error] = at(meta, 'touched', 'error')
  const isError = touched && error && true

  function renderHelperText() {
    if (isError) {
      return <FormHelperText>{error}</FormHelperText>
    }
  }

  return (
    <FormControl {...rest} error={isError}>
      <RadioGroup row {...field}>
        {Object.keys(data).map((item, index) => (
          <FormControlLabel
            value={item}
            label={data[item]}
            key={index}
            control={<Radio />}
          />
        ))}
      </RadioGroup>
      {renderHelperText()}
    </FormControl>
  )
}

export default RadioButtonField
