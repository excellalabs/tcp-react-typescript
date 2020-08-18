import React from "react";
import { useFormikContext } from "formik";
import { Grid, makeStyles } from "@material-ui/core";
import { IEmployeeForm } from "../EmployeeForm.schema";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      maxWidth: "600px",
    },
    item: {
      width: "200px",
    },
  };
});

const Field: React.FC<{ name: string; value: any; value2?: any }> = ({
  name,
  value,
  value2,
}) => {
  const classes = useStyles();

  return (
    <Grid key={name} item className={classes.item}>
      <Grid item>
        <p>
          <b>{name}</b>
        </p>
      </Grid>
      <Grid item>
        <p>{value}</p>
        {value2 && `${value2}`}
      </Grid>
    </Grid>
  );
};

const Review: React.FC<{}> = () => {
  const { values } = useFormikContext();

  const formData = values as IEmployeeForm;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h2>Biographical Information</h2>

      <Grid container spacing={5}>
        <Grid container item direction="row" spacing={1}>
          <Field name="First Name" value={formData.bio.firstName} />
          <Field name="Middle Initial" value={formData.bio.middleInitial} />
          <Field name="Last Name" value={formData.bio.lastName} />
          <Field
            name="Date of Birth"
            value={
              (formData.bio.birthDate as Date)?.toLocaleDateString() ??
              "--/--/----"
            }
          />
          <Field name="Gender" value={formData.bio.gender} />
          <Field name="Ethnicity" value={formData.bio.ethnicity} />
          <Field
            name="Us Citizen"
            value={formData.bio.isCitizen ? "Yes" : "No"}
          />
        </Grid>
      </Grid>

      <h2>Contact Information</h2>
      <Grid container>
        <Field name="Email" value={formData.contact.email} />
        <Field name="Phone Number" value={formData.contact.phoneNumber} />
        <Field
          name="Address"
          value={formData.contact.address1}
          value2={formData.contact.address2}
        />
      </Grid>

      <h2>Skills</h2>
      <Grid container direction="column">
        {formData.skills.map((skill) => {
          return (
            <Grid item container direction="row">
              <Field name={"Skill Name (Skill Category)"} value={skill.skill} />
              <Field name="Proficiency" value={skill.proficiency} />
              <Field
                name="Primary Skill"
                value={skill.primary ? "Yes" : "No"}
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default Review;
