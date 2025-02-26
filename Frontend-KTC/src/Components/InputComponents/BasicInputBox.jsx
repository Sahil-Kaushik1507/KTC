import React from 'react';
import { FastField, ErrorMessage } from "formik";

//3 Required Props 1> lable/ heading of the TextArea 2> Name in Formic Form 
//      3> type any from Text,Number,Email,Password,Date

const BasicInputBox = React.memo((props) => {
    const { name,label, type, ...rest } = props;
    const labelText = label.charAt(0).toUpperCase() + label.slice(1);

    return (
        <div className="relative w-full">
            {/* Input Field */}
            <FastField
                type={type}
                name={name}
                id={name}
                placeholder=" "
                {...rest}
                className="peer w-full border rounded-lg px-3 pt-4 pb-2 text-gray-800 focus:outline-none transition-all border-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {/* Floating Label */}
            <label
                htmlFor={name}
                className="absolute left-3 px-1 bg-[#CBD5E1] text-gray-500 transition-all
                peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 
                peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 
                peer-focus:top-3 peer-focus:text-xs peer-focus:text-blue-600 
                peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-blue-600"
            >
                {labelText}
            </label>
            {/* Error Message */}
            <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-1" />
        </div>
    );
});

export default BasicInputBox;
