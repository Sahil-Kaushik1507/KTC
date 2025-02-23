import React, { useMemo } from "react";
import BasicInputBox from "./BasicInputBox";
import CheckBoxInput from "./CheckBoxInput";
import DropDownInputBox from "./DropDownInputBox";
import RadioInputBox from "./RadioInputBox";
import TextAreaInput from "./TextAreaInput";

const InputControl = React.memo(({ typecheck, ...rest }) => {
    const InputComponent = useMemo(() => {
        switch (typecheck) {
            case "Text":
            case "Email":
            case "Password":
            case "Number":
            case "Date":
                return <BasicInputBox {...rest} typecheck={typecheck} />;
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
    }, [typecheck, rest]);

    return InputComponent;
});

export default InputControl;
    