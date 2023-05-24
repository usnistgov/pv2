import {observer} from "mobx-react-lite";
import {TextFieldProps} from "@material-ui/core/TextField/TextField";
import React, {useEffect, useState} from "react";
import {TextField} from "@material-ui/core";
import {action as mobxAction} from "mobx";

interface ValidatedTextFieldProps {
    // Function that runs when input has been validated.
    onValidate?: (v: any) => void;

    // Yup schema to validate input against.
    schema: any;

    // Callback for when an error occurs during validation.
    onError?: (value: any) => void;

    action?: (value: any) => void;

    shouldUpdate?: () => boolean;
}

const ValidatedTextField = observer(React.forwardRef(({
                                         error,
                                         helperText,
                                         onChange,
                                         onValidate,
                                         onError,
                                         schema,
                                         action,
                                         shouldUpdate,
    value,
                                         ...props
                                     }: ValidatedTextFieldProps & TextFieldProps, ref) => {
    // Error state
    const [errorMessages, setErrorMessages] = useState<string[] | null>(null);

    const validate = (value: any) => {
        schema.validate(value)
            .finally(() => {
                onValidate?.(schema.cast(value));
                setErrorMessages(null);
            })
            .catch((schemaError: { errors: any; }) => {
                onError?.(value);
                setErrorMessages(schemaError.errors);
            });
    };

    const curriedAction = mobxAction((value: any) => action?.(value));

    useEffect(() => {
        if(shouldUpdate && shouldUpdate())
            validate(value);
    }, [shouldUpdate]);

    return <TextField inputRef={ref}
                      error={error || errorMessages !== null}
                      helperText={errorMessages ? <>{helperText} {errorMessages}</> : helperText}
                      onChange={(event) => {
                          validate(event.currentTarget.value);
                          
                          try {
                              const castedValue = schema.cast(event.currentTarget.value);
                              curriedAction(castedValue);
                          } catch {
                              curriedAction(undefined);
                          }

                          onChange?.(event);
                      }}
                      value={value}
                      {...props}/>
}));

export default ValidatedTextField;
