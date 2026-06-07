import React, {
  memo,
  useState,
  useMemo,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { useFormContext, useFormState, useWatch, get } from "react-hook-form";


// <SearchableDropdown name="destination" label="Destination" options=[
// {
//   source_id:1,
//   source_name:"hdr"
// },{
//   source_id:2,
//   source_name:"dli"
// }

// ] onaddnew={addnewfn} allowCustom =true , allowAddNew =true />



const SearchableDropdown = memo(
  ({
    name,
    label,
    initialOption,
    type = "text",

    valueKey = "value",
    labelKey = "label",

    options = [],
    allowCustom = false,
    allowAddNew = false,
    onAddNew,
    upperCase = false
  }) => {
    const { register, setValue, watch, control, trigger } = useFormContext();


    // Register field with React Hook Form
    useEffect(() => {
      register(name, {
        setValueAs: (value) =>
          upperCase && typeof value === "string"
            ? value.toUpperCase()
            : value,
      })
    }
      , [register, name, upperCase]);

    const { errors } = useFormState({ control, name });
    const error = get(errors, name);


    const selectedValue = useWatch({ control, name, });

    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [position, setPosition] = useState("bottom");

    const wrapperRef = useRef(null);


    //set Initial value
    useEffect(() => {
      if (
        initialOption?.[valueKey] &&
        initialOption?.[labelKey] &&
        !selectedValue
      ) {
        setValue(name, initialOption.value);

        setSearch(initialOption.label);
      }
    }, [initialOption, name, setValue, selectedValue]);

    // Currently selected option object
    const selectedOption = useMemo(
      () => options.find(option => option[valueKey] === selectedValue),
      [options, selectedValue, valueKey]
    );

    // Filter options based on search text
    const filteredOptions = useMemo(() => {
      if (!search.trim()) return options;

      return options.filter(option =>
        String(option[labelKey])
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }, [options, search, labelKey]);

    // Populate input when form already has value
    useEffect(() => {
      if (selectedOption && !isTyping) {
        setSearch(selectedOption[labelKey]);
      } else if (!selectedValue) {
        // If there's no form value selected, clear out the search textbox text
        setSearch("");
      }
    }, [selectedOption, selectedValue, isTyping, labelKey]);

    // Close dropdown on outside click
    const handleClickOutside = useCallback(
      e => {
        if (!wrapperRef.current?.contains(e.target)) {
          setOpen(false);

          if (!allowCustom && isTyping) {
            setSearch(selectedOption?.[labelKey] || "");
            setIsTyping(false);
          }
        }
      },
      [allowCustom, isTyping, labelKey]
    );

    useEffect(() => {
      document.addEventListener(
        "mousedown",
        handleClickOutside
      );

      return () =>
        document.removeEventListener(
          "mousedown",
          handleClickOutside
        );
    }, [handleClickOutside]);

    const selectOption = useCallback(
      option => {
        setValue(name, option[valueKey], {
          shouldDirty: true,
          shouldValidate: true,
        });

        setSearch(option[labelKey]);
        setIsTyping(false)
        setOpen(false);
      },
      [name, setValue, valueKey, labelKey]
    );


    const handleBlur = useCallback(async () => {
      await trigger(name);
      if (!allowCustom || !search.trim()) return;

      setValue(name, search.trim(), {
        shouldDirty: true,
        shouldValidate: true,
      });

      
    }, [allowCustom, search, name, setValue]);



    useEffect(() => {
      if (!open || !wrapperRef.current) return;

      const calculatePosition = () => {
        const rect = wrapperRef.current.getBoundingClientRect();
        const dropdownHeight = 250; // max-h-60 (240px) + some buffer space
        const spaceBelow = window.innerHeight - rect.bottom;

        // If space below is less than dropdown height AND there is more space above, flip it
        if (spaceBelow < dropdownHeight && rect.top > spaceBelow) {
          setPosition("top");
        } else {
          setPosition("bottom");
        }
      };

      // Run on open
      calculatePosition();

      // Recalculate on scroll or resize in case things move
      window.addEventListener('scroll', calculatePosition, true);
      window.addEventListener('resize', calculatePosition);

      return () => {
        window.removeEventListener('scroll', calculatePosition, true);
        window.removeEventListener('resize', calculatePosition);
      };
    }, [open]);

    return (
      <div className="w-full">
        <div ref={wrapperRef} className="relative w-full">
          {/* Search Input */}
          <input
            id={name}
            value={search}
            type={type}
            placeholder=" "
            onFocus={() => setOpen(true)}
            onBlur={handleBlur}
            onChange={e => {
              setSearch(e.target.value);
              setIsTyping(true)
              setOpen(true);
            }}
            className={` ${upperCase ? "uppercase" : ""} peer w-full border rounded-lg px-3 pt-4 pb-2 text-gray-800 focus:outline-none transition-all border-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}

          />

          {/* Floating Label */}
          <label
            htmlFor={name}
            className="absolute left-3 px-1 bg-white text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-3 peer-focus:text-xs peer-focus:text-blue-600 peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-blue-600"
          >
            {label}
          </label>

          {/* Dropdown */}
          {open && (
            <div className={`absolute z-50 max-h-48 w-full overflow-y-auto rounded-lg border border-gray-300 bg-white shadow-lg transition-all
            ${position === "top" ? "bottom-full mb-1" : "top-full mt-1"}`}>
              {filteredOptions.map(option => (
                <div
                  key={option[valueKey]}
                  onMouseDown={() => selectOption(option)}
                  className="cursor-pointer px-3 py-2 hover:bg-blue-50 hover:text-blue-600"
                >
                  {option[labelKey]}
                </div>
              ))}

              {allowAddNew && (
                <div
                  onMouseDown={onAddNew}
                  className="cursor-pointer border-t border-gray-300 px-3 py-2 font-medium text-blue-600 hover:bg-blue-50"
                >
                  + Add New
                </div>
              )}

              {!filteredOptions.length && !allowAddNew && (
                <div className="px-3 py-2 text-gray-500">
                  No results found
                </div>
              )}
            </div>
          )}
        </div>
        {/* Validation Error */}
        {error && (
          <p className="mt-1 ml-4 text-sm text-red-500">
            {error.message}
          </p>
        )}
      </div>
    );


  }
);

SearchableDropdown.displayName = "SearchableDropdown";

export default SearchableDropdown;