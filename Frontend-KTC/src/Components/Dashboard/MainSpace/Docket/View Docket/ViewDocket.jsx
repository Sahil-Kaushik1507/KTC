import React, { useCallback } from "react";
import { Formik, Form } from "formik";
import axios from "axios";
import ViewDocketFormMaker from "./ViewDocketFormMaker";
import initialValues from "../InitialValuesOfForm";
import {useDocketContextData} from "../../../../../Context/DocketContext.jsx"

export default function ViewDocketForm() {
    const {setSearchedDocketNo,setIsReadOnly}=useDocketContextData();

  const onSubmit = useCallback(async (values, { setValues }) => {
    console.log("Form Data:", values);
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/docket/view",
        {
          params: { searchDocketNo: values.SearchDocket },
        },
      );

      if (response?.data) {
        console.log(response.data)
        setValues(response.data);
        setSearchedDocketNo(response.data.DocketNo);
        setIsReadOnly(true);

      } else {
        console.error("Response data is undefined");
      }
    } catch (error) {
      console.error("Error fetching docket data:", error);
    }
  }, []);

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {() => (
        <Form>
          <ViewDocketFormMaker />
        </Form>
      )}
    </Formik>
  );
}
