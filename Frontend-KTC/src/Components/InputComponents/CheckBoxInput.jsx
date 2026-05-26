import React, { memo } from "react";
import { useFormContext, useFormState } from "react-hook-form";

// Required Props:
// 1. label -> heading of checkbox group
// 2. options -> array of checkbox values

const CheckBoxInput = memo(
  ({ label, options = [], ...rest }) => {
    const labelText = label.charAt(0).toUpperCase() + label.slice(1);

    const { register, control } = useFormContext();

    // Subscribe only to this field error
    const { errors } = useFormState({
      control,
      name: label,
    });

    const error = errors?.[label];

    // register only once
    const registerField = register(label);

    return (
      <div className="flex flex-col w-full">
        {/* Group Label */}
        <label className="text-gray-600 font-medium mb-1">
          {labelText}
        </label>

        {/* Checkbox Options */}
        <div className="flex gap-4 flex-wrap">
          {options.map((option) => (
            <label
              key={option}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                value={option}
                {...registerField}
                {...rest}
                className="hidden peer"
              />

              <span className="w-5 h-5 border-2 border-gray-400 rounded-md flex items-center justify-center transition-all peer-checked:border-blue-500 peer-checked:ring-2 peer-checked:ring-blue-500">
                <svg
                  className="w-4 h-4 text-blue-500 opacity-0 transition-opacity peer-checked:opacity-100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </span>

              <span className="text-gray-800">{option}</span>
            </label>
          ))}
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

CheckBoxInput.displayName = "CheckBoxInput";

export default CheckBoxInput;