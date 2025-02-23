import React, { useCallback } from "react";
import { FastField, ErrorMessage } from "formik";

//2 Required Props 1> lable/ heading of the dropDown options 2> Options Array

const DropDownInputBox = React.memo(({ label, options, ...rest }) => {
    const labelText = label.charAt(0).toUpperCase() + label.slice(1);

    const renderOptions = useCallback(() => {
        return options.map((option) => (
            <option key={option} value={option} className="text-gray-800">
                {option.charAt(0).toUpperCase() + option.slice(1)}
            </option>
        ));
    }, [options]);

    return (
        <div className="relative w-full">
            {/* Select Dropdown */}
            <FastField
                as="select"
                name={label}
                {...rest}
                className="peer w-full border rounded-lg px-3 pt-4 pb-2 text-gray-800 focus:outline-none transition-all border-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none"
            >
                <option value="" className="text-gray-400">
                    Select {labelText}
                </option>
                {renderOptions()}
            </FastField>

            {/* Label */}
            <label
                htmlFor={label}
                className="absolute left-3 px-1 bg-white text-gray-500 transition-all 
                           peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600
                           peer-valid:-top-2 peer-valid:text-xs peer-valid:text-blue-600"
            >
                {labelText}
            </label>

            {/* Error Message */}
            <ErrorMessage name={label} component="div" className="text-red-500 text-sm mt-1" />
        </div>
    );
});

export default DropDownInputBox;
