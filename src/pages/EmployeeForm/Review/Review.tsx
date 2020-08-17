import React from "react";
import { useFormikContext } from "formik";
import { Grid } from "@material-ui/core";
import { IEmployeeForm } from "../EmployeeForm.schema";

const Review: React.FC<{}> = () => {
  const { values } = useFormikContext();

  const formData = values as IEmployeeForm;
  return (
    <>
      <h2>Biographical Information</h2>

      <Grid container spacing={3}>
        <Grid item>
          First Name
          {formData.bio.firstName}
        </Grid>
        <Grid item>
          <b>Middle Initial</b> {formData.bio.middleInitial}
        </Grid>
        <Grid item>{formData.bio.lastName}</Grid>
      </Grid>
    </>
  );
};

export default Review;
