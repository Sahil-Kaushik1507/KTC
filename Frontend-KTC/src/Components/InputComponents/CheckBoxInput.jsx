import React, { useCallback } from "react";
import { FastField, ErrorMessage } from "formik";

//2 Required Props 1> lable/ heading of the radio options 2> Options Array

const CheckBoxInput = React.memo(({ label, options, ...rest }) => {
    const labelText = label.charAt(0).toUpperCase() + label.slice(1);

    const renderOptions = useCallback(() => {
        return options.map((option) => (
            <label key={option} className="flex items-center gap-2 cursor-pointer">
                <FastField
                    type="checkbox"
                    name={label}
                    value={option}
                    {...rest}
                    className="hidden peer"
                />
                <span className="w-5 h-5 border-2 border-gray-400 rounded-md flex items-center justify-center transition-all peer-checked:border-blue-500 peer-checked:ring-2 peer-checked:ring-blue-500">
                    <svg
                        className="w-4 h-4 text-blue-500 opacity-0 transition-all peer-checked:opacity-100"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </span>
                <span className="text-gray-800">{option}</span>
            </label>
        ));
    }, [label, options, rest]);

    return (
        <div className="flex flex-col w-full">
            {/* Label */}
            <label htmlFor={label} className="text-gray-600 font-medium mb-1">{labelText}</label>
            <div className="flex gap-4 flex-wrap">{renderOptions()}</div>
            {/* Error Message */}
            <ErrorMessage name={label} component="div" className="text-red-500 text-sm mt-1" />
        </div>
    );
});

export default CheckBoxInput;
