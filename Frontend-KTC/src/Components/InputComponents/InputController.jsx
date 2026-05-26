import React, { useMemo } from "react";
import BasicInput from "./BasicInput";
import CheckBoxInput from "./CheckBoxInput";
import DroupDownInput from "./DropDownInput";
import RadioInput from "./RadioInput";
import TextAreaInput from "./TextAreaInput";


const InputControl = React.memo(({ type, ...rest }) => {

    const InputComponent = useMemo(() => {
        switch (type) {
            case "text":
            case "email":   
            case "password":
            case "number":
            case "date":
                return <BasicInput {...rest} type={type} />;
            case "checkbox":
                return <CheckBoxInput {...rest} />;
            case "radio":
                return <RadioInput {...rest} />;
            case "droupdown":
                return <DroupDownInput {...rest} />;
            case "textarea":
                return <TextAreaInput {...rest} />;
            
            default:
                return null;
        }
    }, [type, rest]);

    return InputComponent;
});

export default InputControl;
    