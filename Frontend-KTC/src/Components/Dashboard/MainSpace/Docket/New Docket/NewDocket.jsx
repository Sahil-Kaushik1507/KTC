import React, { useCallback, useMemo } from "react";
import { Formik, Form } from "formik";
import axios from "axios";
import NewDocketValidationSchema from "./NewDocketValidationSchema";
import NewDocketFormMaker from "./NewDocketFormMaker";
import initialValues from "../InitialValuesOfForm.jsx";

export default function NewDocketForm() {
 
  const onSubmit = useCallback(async (values) => {
    console.log("Form Data:", values);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/docket/new",
        values,
      );
      console.log("Data sent successfully:", response.data);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={NewDocketValidationSchema}
      onSubmit={onSubmit}
    >
      {() => (
        <Form>
          <div>
            <NewDocketFormMaker />
          </div>
        </Form>
      )}
    </Formik>
  );
}
