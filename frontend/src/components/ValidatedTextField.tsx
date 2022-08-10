import {observer} from "mobx-react-lite";
import {TextFieldProps} from "@material-ui/core/TextField/TextField";
import React, {useState} from "react";
import {TextField} from "@material-ui/core";

interface ValidatedTextFieldProps {
    // Function that runs when input has been validated.
    onValidate: (v: any) => void;

    // Yup schema to validate input against.
    schema: any;

    // Callback for when an error occurs during validation.
    onError?: (value: any) => void;
}

const ValidatedTextField = observer(({
                                         error,
                                         helperText,
                                         onChange,
                                         onValidate,
                                         onError,
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
            .catch((schemaError: { errors: any; }) => {
                onError?.(value);
                setErrorMessages(schemaError.errors)
            });
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
