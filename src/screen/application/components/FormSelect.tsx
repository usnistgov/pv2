import {Component} from "react";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {ReduxGetSet} from "../Utils";
import "./FormSelect.css";

interface ComponentProps {
    label: string;
    value: ReduxGetSet<string>;
    options: string[];
    required?: boolean;
}

interface State {
    error: boolean;
    message: string[];
}

class FormSelect<T> extends Component<ComponentProps, State> {
    constructor(props: ComponentProps) {
        super(props);

        this.state = {
            error: false,
            message: [],
        }
    }

    render() {
        return (
            <FormControl fullWidth variant={"filled"}>
                <InputLabel id={this.props.label}>{this.props.label}</InputLabel>
                <Select className={"form-select-left-align"}
                        fullWidth
                        labelId={this.props.label}
                        value={this.props.value.get()}
                        id={this.props.label}
                        onChange={(event) => {
                            this.props.value.set(event.target.value as string)
                        }}>
                    {this.props.options.map(option => <MenuItem value={option}>{option}</MenuItem>)}
                </Select>
            </FormControl>
        );
    }
}

export default FormSelect;