import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, TextField, Box } from "@mui/material";

const FormikForm = ({ onSubmit, initValues, buttonName }) => {
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    body: Yup.string().required("Body is required"),
  });

  console.log("initialValues : ", initValues);
  return (
    <Formik
      initialValues={initValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ isSubmitting }) => (
        <Form>
          <Box mb={2}>
            <Field
              as={TextField}
              name="title"
              label="Title"
              variant="outlined"
              fullWidth
            />
            <ErrorMessage name="title" component="div" />
          </Box>
          <Box mb={2}>
            <Field
              as={TextField}
              name="body"
              label="Body"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
            />
            <ErrorMessage name="body" component="div" />
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            {buttonName}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default FormikForm;
