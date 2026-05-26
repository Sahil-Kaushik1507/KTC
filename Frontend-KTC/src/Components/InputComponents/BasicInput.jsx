import React, { memo } from "react";
import { useFormContext, useFormState } from "react-hook-form";

// Required Props:
// 1. label -> Heading of the input
// 2. name  -> Field name for React Hook Form
// 3. type  -> text, number, email, password, date, etc.

const BasicInput = memo(
  ({ name, label, type = "text", ...rest }) => {
    const labelText =
      label.charAt(0).toUpperCase() + label.slice(1);

    const { register, control } = useFormContext();

    // Subscribe only to this field
    const { errors } = useFormState({
      control,
      name,
    });

    const error = errors?.[name];

    // register only once
    const registerField = register(name);

    return (
      <div className="relative w-full">
        <input
          type={type}
          id={name}
          placeholder=" "
          {...registerField}
          {...rest}
          className="peer w-full border rounded-lg px-3 pt-4 pb-2 text-gray-800 focus:outline-none transition-all border-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />

        <label
          htmlFor={name}
          className="absolute left-3 px-1 bg-white text-gray-500 transition-all
                peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 
                peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 
                peer-focus:top-3 peer-focus:text-xs peer-focus:text-blue-600 
                peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-blue-600"
        >
          {labelText}
        </label>

        {error && (
          <div className="text-red-500 text-sm mt-1">
            {error.message}
          </div>
        )}
      </div>
    );
  }
);

BasicInput.displayName = "BasicInput";

export default BasicInput;