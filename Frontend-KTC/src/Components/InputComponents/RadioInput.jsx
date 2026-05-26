import React, { memo } from "react";
import { useFormContext, useFormState } from "react-hook-form";

// Required Props:
// 1. label   -> heading of radio group
// 2. options -> array of radio values

const RadioInput = memo(
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
      <div className="flex flex-col w-full">
        {/* Group Label */}
        <label className="text-gray-600 font-medium mb-1">
          {labelText}
        </label>

        {/* Radio Options */}
        <div className="flex gap-4 flex-wrap">
          {options.map((option) => (
            <label
              key={option}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                value={option}
                {...registerField}
                {...rest}
                className="hidden peer"
              />

              {/* Custom Radio UI */}
              <span
                className="w-5 h-5 border-2 border-gray-400 rounded-full 
                flex items-center justify-center transition-all
                peer-checked:border-blue-500 
                peer-checked:ring-2 peer-checked:ring-blue-500"
              >
                <span
                  className="w-2.5 h-2.5 rounded-full bg-blue-500 
                  opacity-0 transition-opacity 
                  peer-checked:opacity-100"
                />
              </span>

              <span className="text-gray-800">
                {option}
              </span>
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

RadioInput.displayName = "RadioInput";

export default RadioInput;