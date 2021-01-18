import {Component} from "react";
import {InputAdornment, TextField} from "@material-ui/core";
import {InputProps as StandardInputProps} from "@material-ui/core/Input/Input";
import {ReduxGetSet} from "../Utils";

interface ComponentProps<T> {
    label: string;
    schema: any;
    value: ReduxGetSet<T>;
    required?: boolean;
    type?: string;
    startAdornment?: string;
    endAdornment?: string;
}

interface State {
    error: boolean;
    message: string[];
}

class FormField<T> extends Component<ComponentProps<T>, State> {
    constructor(props: ComponentProps<T>) {
        super(props);

        this.state = {
            error: false,
            message: [],
        }
    }

    render() {
        return (
            <TextField fullWidth
                       type={this.props.type}
                       required={this.props.required}
                       error={this.state.error}
                       helperText={this.state.message}
                       label={this.props.label}
                       defaultValue={this.props.value.get()}
                       variant={"filled"}
                       onChange={(event) => {
                           this.props.schema.validate(event.target.value)
                               .finally(() => {
                                   this.props.value.set(this.props.schema.cast(event.target.value));
                                   this.setState({
                                       error: false,
                                       message: [],
                                   });
                               })
                               .catch((schemaError: { errors: any; }) => {
                                    this.setState({
                                        error: true,
                                        message: schemaError.errors,
                                    });
                               });
                       }}
                       InputProps={this.getInputProps()}
            />
        );
    }

    getInputProps(): StandardInputProps {
        let inputProps: StandardInputProps = {};

        if (this.props.startAdornment !== undefined) {
            inputProps['startAdornment'] = <InputAdornment position={"start"}>{this.props.startAdornment}</InputAdornment>
        }
        if (this.props.endAdornment !== undefined) {
            inputProps['endAdornment'] = <InputAdornment position={"end"}>{this.props.endAdornment}</InputAdornment>
        }

        return inputProps;
    }
}

export default FormField;