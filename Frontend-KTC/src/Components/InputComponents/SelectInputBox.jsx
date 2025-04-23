import React, { useCallback } from "react";
import { FastField, ErrorMessage } from "formik";

const SelectInputBox = React.memo(({ label, options, ...rest }) => {
  const labelText = label.charAt(0).toUpperCase() + label.slice(1);
  const dataListId = `${label}-options`;

  const renderOptions = useCallback(() => {
    return options.map((option) => <option key={option} value={option} />);
  }, [options]);

  return (
    <div className="relative w-full">
      {/* Input with Datalist */}
      <FastField
        as="input"
        list={dataListId}
        name={label}
        {...rest}
        className="peer w-full border rounded-lg px-3 pt-4 pb-2 text-gray-800 focus:outline-none transition-all border-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        // placeholder={`Select or enter ${labelText}`}
        placeholder=""
      />
      <datalist id={dataListId}>{renderOptions()}</datalist>

      {/* Floating Label */}
      <label
        htmlFor={label}
        className="absolute left-3 px-1 bg-[#CBD5E1] text-gray-500 transition-all
                peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 
                peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 
                peer-focus:top-3 peer-focus:text-xs peer-focus:text-blue-600 
                peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-blue-600"
      >
        {labelText}
      </label>

      {/* Error Message */}
      <ErrorMessage
        name={label}
        component="div"
        className="text-red-500 text-sm mt-1"
      />
    </div>
  );
});

export default SelectInputBox;
