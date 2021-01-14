import {Component} from "react";
import {Box, Grid, Paper, TextField} from "@material-ui/core";
import MaterialHeader from "../MaterialHeader";
import "./AddressForm.css"
import FormField from "../FormField";
import {RootState} from "../../ApplicationStore";
import {connect} from "react-redux";
import {addressSlice, citySlice, stateSlice, zipcodeSlice} from "./AddressFormReducer"
import * as Yup from 'yup';

interface DispatchProps {
    setAddress: (s: string) => void;
    setCity: (s: string) => void;
    setState: (s: string) => void;
    setZipcode: (s: string) => void;
}

interface StateProps {
    address: string;
    city: string;
    state: string;
    zipcode: string;
}

interface ComponentState {
    errors: {
        address: string,
        city: string,
        state: string,
        zipcode: string,
    }
}

type Props = DispatchProps & StateProps;

class AddressForm extends Component<Props, ComponentState> {
    constructor(props: Props){
        super(props);

        this.state = {
            errors: {
                address: "",
                city: "",
                state: "",
                zipcode: "",
            }
        }
    }

    render() {
        let schema = Yup.object({
            address: Yup.string()
                .required(),
            city: Yup.string()
                .required(),
            state: Yup.string()
                .required(),
            zipcode: Yup.string()
                .required(),
        });

        return (
            <Box>
                <MaterialHeader text={"Address"}/>
                <Grid className={"form-container"} container justify={"center"} spacing={8}>
                    <Grid item xs={6}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField fullWidth
                                           error={this.state.errors.address !== ""}
                                           helperText={this.state.errors.address}
                                           label={"Address"}
                                           defaultValue={this.props.address}
                                           variant={"filled"}
                                           onChange={(event) => {
                                               if(event.target.value === ""){
                                                   this.setState((state) => {
                                                       state.errors.address = "required";
                                                       return state;
                                                   })
                                               } else {
                                                   this.setState((state) => {
                                                       state.errors.address = "";
                                                       return state;
                                                   })
                                               }
                                           }}
                                />
                            </Grid>
                            {["Address", "City", "State", "Zipcode"].map(this.createFormField)}
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={"map"} elevation={3}>
                            <iframe
                                title={"Google Address Map"}
                                frameBorder="0"
                                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDGXJiK0XkDxlx2loXvonuX6BJOIYpd0Lg
                            &q=${this.props.address}, ${this.props.city}, ${this.props.state} ${this.props.zipcode}`}
                                allowFullScreen/>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        );
    }

    lift(func: (s: string) => void): (event: { target: { value: string } }) => void {
        return (event) => func(event.target.value);
    }

    createFormField = (label: string) => (
        <Grid item xs={12}>
            <FormField label={label}
                       defaultValue={this.props[label.toLowerCase() as keyof StateProps]}
                       onChange={this.lift(this.props[`set${label}` as keyof DispatchProps])}/>
        </Grid>
    );
}

/*
 * Redux mappings and export
 */
function mapStateToProps(state: RootState): StateProps {
    return {
        address: state.address,
        city: state.city,
        state: state.state,
        zipcode: state.zipcode,
    }
}

const mapDispatchToProps = {
    setAddress: (s: string) => addressSlice.actions.set(s),
    setCity: (s: string) => citySlice.actions.set(s),
    setState: (s: string) => stateSlice.actions.set(s),
    setZipcode: (s: string) => zipcodeSlice.actions.set(s),
}

export default connect(mapStateToProps, mapDispatchToProps)(AddressForm);