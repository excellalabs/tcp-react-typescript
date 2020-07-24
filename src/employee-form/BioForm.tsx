import React from "react";
import * as yup from "yup";
import { Formik, Form, Field } from "formik";
import TextField from "@material-ui/core/TextField";

const validationSchema = yup.object({
  firstName: yup.string().required("First Name is required").max(20),
  lastName: yup.string().required("Last Name is required").max(20),
});

export default function BioForm({
  formData,
  setFormData,
  setIsNotComplete,
}: any) {
  return (
    <Formik
      initialValues={formData}
      onSubmit={(values) => {
        setFormData(values);
        setIsNotComplete(false);
      }}
      validationSchema={validationSchema}
    >
      {({ errors, touched }) => (
        <Form>
          <Field
            name="firstName"
            label="First Name *"
            margin="normal"
            as={TextField}
            error={touched.firstName && errors.firstName}
            helperText={touched.firstName && errors.firstName}
          />
          <Field
            name="middleInitial"
            label="Middle Initial"
            margin="normal"
            as={TextField}
          />
          <Field
            name="lastName"
            label="Last Name *"
            margin="normal"
            as={TextField}
            error={touched.lastName && errors.lastName}
            helperText={touched.lastName && errors.lastName}
          />
        </Form>
      )}
    </Formik>
  );
}
