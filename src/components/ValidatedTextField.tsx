import {observer} from "mobx-react-lite";
import {TextFieldProps} from "@material-ui/core/TextField/TextField";
import React, {ReactElement, useState} from "react";
import {TextField} from "@material-ui/core";
import Pv2Tooltip from "./Pv2Tooltip/Pv2Tooltip";
import {Icon as MdiIcon} from "@mdi/react";
import {mdiInformation} from "@mdi/js";

interface ValidatedTextFieldProps {
    // Function that runs when input has been validated.
    onValidate: (v: any) => void;

    // Yup schema to validate input against.
    schema: any;
}

const ValidatedTextField = observer(({
                                         error,
                                         helperText,
                                         onChange,
                                         onValidate,
                                         schema,
                                         ...props
                                     }: ValidatedTextFieldProps & TextFieldProps, ref) => {
    // Error state
    const [errorMessages, setErrorMessages] = useState<string[] | null>(null);

    const validate = (value: any) => {
        schema.validate(value)
            .finally(() => {
                onValidate(schema.cast(value));
                setErrorMessages(null);
            })
            .catch((schemaError: { errors: any; }) => setErrorMessages(schemaError.errors));
    };

    return <TextField inputRef={ref}
                      error={error || errorMessages !== null}
                      helperText={errorMessages ? <>{helperText} {errorMessages}</> : helperText}
                      onChange={(event) => {
                          validate(event.currentTarget.value)
                          onChange?.(event);
                      }}
                      {...props}/>
}, {forwardRef: true});

export default ValidatedTextField;
