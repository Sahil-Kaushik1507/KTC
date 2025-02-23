import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextBox from "./Components/InputComponents/BasicInputBox";
import RadioInputBox from "./Components/InputComponents/RadioInputBox";
import CheckBoxInput from "./Components/InputComponents/CheckBoxInput";
import DropDownInputBox from "./Components/InputComponents/DropDownInputBox";
import TextAreaInput from "./Components/InputComponents/TextAreaInput";
import InputControl from "./Components/InputComponents/InputController";

const Testform = () => {
    const initialValues = { name: "", email: "", password: "", gender: "", seletionList: "", Dropdown: "", TextAreaRemarks: "",docketno:"", Truckno:"",Date:""};

    const validationSchema = Yup.object({
        // name: Yup.string().min(3, "Too Short!").required("Required"),
        // email: Yup.string().email("Invalid email").required("Required"),
        // password: Yup.string().min(6, "Minimum 6 characters").required("Required"),
        // gender: Yup.string().required("Required"),
        // seletionList: Yup.array().required("Required"),
        // Dropdown: Yup.string().required("Required"),

    });

    const onSubmit = (values, { resetForm }) => {
        console.log("Form Data:", values);
        alert("Form Submitted!");
        resetForm();
    };
    const options = ["male", "female"]

    return (
        <div className="max-w-md mx-auto bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Signup Form</h2>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {({ isSubmitting, values }) => (
                    <Form className="space-y-4">
                        {/* {['name', 'email', 'password'].map((field) => (
                            <TextBox label={field} type="text" key={field} />
                        ))} */}

                        {/* <RadioInputBox label="gender" options={options}/>
                            <CheckBoxInput label="seletionList" options={options}/>
                            <DropDownInputBox label="Dropdown" options={options}/>
                            <TextAreaInput label="TextAreaRemarks" rowscount="4"/> */}

                        <InputControl
                            typecheck='Number'
                            label='docketno'
                        />
                        <InputControl
                            typecheck='Text'
                            label='Truckno'
                        />
                        <InputControl
                            typecheck='Date'
                            label='Date'
                        />
                        <InputControl
                            typecheck='Radio'
                            label='gender'
                            options={options}
                        />
                       

                        <button type="submit" disabled={isSubmitting} className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                            {isSubmitting ? "Submitting..." : "Submit"}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Testform;
