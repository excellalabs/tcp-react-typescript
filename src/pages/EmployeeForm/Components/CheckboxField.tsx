import React from "react";
import { at } from "lodash";
import { useField } from "formik";
import {
  FormControl,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@material-ui/core";

function CheckboxField(props: any) {
  const { label, data, ...rest } = props;
  const [field, meta, helper] = useField(props);
  const [touched, error] = at(meta, "touched", "error");
  const isError = touched && error && true;

  return (
    <FormControl {...rest} error={isError}>
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              name={props.name}
              defaultChecked={field.value}
              onChange={(isChecked) =>
                helper.setValue(isChecked.target.checked)
              }
            />
          }
          label={props.label}
        />
      </FormGroup>
    </FormControl>
  );
}

export default CheckboxField;
