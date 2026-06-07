import React, { memo } from "react";
import { useFormContext, useFormState } from "react-hook-form";

// Required Props:
// 1. label   -> field name / label
// 2. options -> array of dropdown options

const DroupDownInput = memo(
  ({ label, options = [], ...rest }) => {
    const labelText =
      label.charAt(0).toUpperCase() + label.slice(1);

    const { register, control } = useFormContext();

    // Subscribe only to this field
    const { errors } = useFormState({
      control,
      name: label,
    });

    const error = errors?.[label];

    // register only once
    const registerField = register(label);

    return (
      <div className="w-full">
      <div className="relative">
        {/* Select Input */}
        <select
          id={label}
          defaultValue=""
          {...registerField}
          {...rest}
          className="peer mt-2 w-full border rounded-lg px-3 pt-4 pb-2 text-gray-800 
          focus:outline-none transition-all border-gray-400 
          focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
          bg-white appearance-none"
        >
          <option value="" disabled hidden>
            Select {labelText}
          </option>

          {options.map((option) => (
            <option
              key={option}
              value={option}
              className="text-gray-800"
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </option>
          ))}
        </select>

        {/* Floating Label */}
        <label
          htmlFor={label}
          className="absolute left-3 top-3 px-1 bg-white text-xs text-blue-600 transition-all"
        >
          {labelText}
        </label>
        </div>

        {/* Error */}
        {error && (
          <div className="text-red-500 text-sm mt-1">
            {error.message}
          </div>
        )}
      </div>
    );
  }
);

DroupDownInput.displayName = "DroupDownInput";

export default DroupDownInput;