import {Component} from "react";
import {InputAdornment, TextField} from "@material-ui/core";
import {InputProps as StandardInputProps} from "@material-ui/core/Input/Input";

interface ComponentProps {
    label: string;
    defaultValue?: string;
    onChange?: (event: { target: { value: string } }) => void;
    startAdornment?: string;
    endAdornment?: string;
}

class FormField extends Component<ComponentProps, any> {
    render() {
        return (
            <TextField fullWidth
                       label={this.props.label}
                       defaultValue={this.props.defaultValue}
                       variant={"filled"}
                       onChange={this.props.onChange}
                       InputProps={this.getInputProps()}
            />
        );
    }

    getInputProps(): StandardInputProps {
        let inputProps: StandardInputProps = {};

        if (this.props.startAdornment !== undefined) {
            inputProps['startAdornment'] = <InputAdornment position={"start"}>this.props.startAdornment</InputAdornment>
        }
        if (this.props.endAdornment !== undefined) {
            inputProps['endAdornment'] = <InputAdornment position={"end"}>this.props.endAdornment</InputAdornment>
        }

        return inputProps;
    }
}

export default FormField;