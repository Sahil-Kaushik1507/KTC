import React, { useMemo } from "react";
import BasicInputBox from "./BasicInputBox";
import CheckBoxInput from "./CheckBoxInput";
import DropDownInputBox from "./DropDownInputBox";
import RadioInputBox from "./RadioInputBox";
import TextAreaInput from "./TextAreaInput";
import SelectInputBox from "./SelectInputBox";

const InputControl = React.memo(({ type, ...rest }) => {

    const InputComponent = useMemo(() => {
        switch (type) {
            case "text":
            case "email":   
            case "password":
            case "number":
            case "date":
                return <BasicInputBox {...rest} type={type} />;
            case "radio":
                return <RadioInputBox {...rest} />;
            case "dropdown":
                return <DropDownInputBox {...rest} />;
            case "select":
                return <SelectInputBox {...rest} />;
            case "textarea":
                return <TextAreaInput {...rest} />;
            case "checkbox":
                return <CheckBoxInput {...rest} />;
            default:
                return null;
        }
    }, [type, rest]);

    return InputComponent;
});

export default InputControl;
    