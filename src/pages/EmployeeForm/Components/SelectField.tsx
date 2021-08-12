import React from 'react'
import { at } from 'lodash'
import { useField } from 'formik'
import {
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
} from '@material-ui/core'

function SelectField(props: any) {
  const { label, data, ...rest } = props
  const [field, meta] = useField(props)
  const { value: selectedValue } = field
  const [touched, error] = at(meta, 'touched', 'error')
  const isError = touched && error && true
  function renderHelperText() {
    if (isError) {
      return <FormHelperText>{error}</FormHelperText>
    }
  }

  return (
    <FormControl {...rest} error={isError}>
      <InputLabel>{label}</InputLabel>
      <Select
        {...field}
        data-testid={props.name}
        value={selectedValue ? selectedValue : ''}
      >
        {Object.keys(data).map((item, index) => (
          <MenuItem key={index} value={item}>
            {data[item]}
          </MenuItem>
        ))}
      </Select>
      {renderHelperText()}
    </FormControl>
  )
}

export default SelectField
