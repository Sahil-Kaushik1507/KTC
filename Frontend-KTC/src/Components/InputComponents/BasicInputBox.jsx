import React from 'react'
import { FastField, ErrorMessage } from "formik";

// Simple Text Box, email box, password box, number box, date box
// 2 required props 1> label 2>type (can be : text,email, password, number, date)

const BasicInputBox = React.memo((props) => {
    console.log(props);
    const { label, type, ...rest }=props;
    const labelText = label.charAt(0).toUpperCase() + label.slice(1);

    return (
        <div className="relative w-full">
            {/* Input Field */}
            <FastField
                type={type}
                name={label}
                id={label}
                {...rest}
                className="peer w-full border rounded-lg px-3 pt-4 pb-2 text-gray-800 focus:outline-none transition-all border-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {/* Floating Label */}
            <label
                htmlFor={label}
                className="absolute left-3 px-1 transition-all bg-white text-gray-500 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-gray-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600"
            >
                {labelText}
            </label>
            {/* Error Message */}
            <ErrorMessage name={label} component="div" className="text-red-500 text-sm mt-1" />
        </div>
    );
});

export default BasicInputBox;