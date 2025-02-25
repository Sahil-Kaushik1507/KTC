import React, { useMemo } from "react";
import BasicInputBox from "./BasicInputBox";
import CheckBoxInput from "./CheckBoxInput";
import DropDownInputBox from "./DropDownInputBox";
import RadioInputBox from "./RadioInputBox";
import TextAreaInput from "./TextAreaInput";

const InputControl = React.memo(({ type, ...rest }) => {
    console.log({...rest})
    const InputComponent = useMemo(() => {
        switch (type) {
            case "Text":
            case "Email":
            case "Password":
            case "Number":
            case "Date":
                return <BasicInputBox {...rest} type={type} />;
            case "Radio":
                return <RadioInputBox {...rest} />;
            case "DropDown":
                return <DropDownInputBox {...rest} />;
            case "TextArea":
                return <TextAreaInput {...rest} />;
            case "CheckBox":
                return <CheckBoxInput {...rest} />;
            default:
                return null;
        }
    }, [type, rest]);

    return InputComponent;
});

export default InputControl;
    