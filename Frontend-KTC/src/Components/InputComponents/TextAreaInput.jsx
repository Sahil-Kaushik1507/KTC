import React from "react";
import { FastField, ErrorMessage } from "formik";

//2 Required Props 1> lable/ heading of the TextArea 2> RowsCount 

const TextAreaInput = React.memo(({ label, rowscount, ...rest }) => {
    const labelText = label.charAt(0).toUpperCase() + label.slice(1);

    return (
        <div className="relative w-full">
            {/* Textarea Field */}
            <FastField
                as="textarea"
                name={label}
                rows={rowscount}
                {...rest}
                className="peer w-full border rounded-lg px-3 pt-4 pb-2 text-gray-800 focus:outline-none transition-all border-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            
            {/* Label */}
            <label
                className="absolute left-3 px-1 transition-all bg-white text-gray-500 
                           peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 
                           peer-placeholder-shown:text-gray-500 peer-focus:-top-2 peer-focus:text-xs 
                           peer-focus:text-blue-600"
            >
                {labelText}
            </label>

            {/* Error Message */}
            <ErrorMessage name={label} component="div" className="text-red-500 text-sm mt-1" />
        </div>
    );
});

export default TextAreaInput;
