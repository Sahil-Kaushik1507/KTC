import React, { useCallback } from "react";
import { FastField, ErrorMessage } from "formik";

//2 Required Props 1> lable/heading of the radio options 2> Options Array

const RadioInputBox = React.memo(({ label, options, ...rest }) => {
    const labelText = label.charAt(0).toUpperCase() + label.slice(1);

    const renderOptions = useCallback(() => {
        return options.map((option) => (
            <label key={option} className="flex items-center gap-2 cursor-pointer">
                <FastField
                    type="radio"
                    name={label}
                    value={option}
                    {...rest}
                    className="hidden peer"
                />
                <span className="w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center transition-all peer-checked:border-blue-500 peer-checked:ring-2 peer-checked:ring-blue-500">
                    <span className="w-3 h-3 bg-blue-500 rounded-full opacity-0 transition-all peer-checked:opacity-100"></span>
                </span>
                <span className="text-gray-800">{option}</span>
            </label>
        ));
    }, [label, options, rest]);

    return (
        <div className="flex flex-col w-full">
            {/* Label */}
            <label htmlFor={label} className="text-gray-600 font-medium mb-1">{labelText}</label>
            <div className="flex gap-4">{renderOptions()}</div>
            {/* Error Message */}
            <ErrorMessage name={label} component="div" className="text-red-500 text-sm mt-1" />
        </div>
    );
});

export default RadioInputBox;
