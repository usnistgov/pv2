import {Component} from "react";
import {Box, Grid, Paper} from "@material-ui/core";
import MaterialHeader from "../components/MaterialHeader";
import "./AddressForm.css"
import FormField from "../components/FormField";
import {RootState} from "../ApplicationStore";
import {connect} from "react-redux";
import {addressSlice, citySlice, stateSlice, zipcodeSlice} from "./AddressFormReducer"
import * as Yup from 'yup';
import {ReduxGetSet} from "../Utils";

interface StateProps {
    address: ReduxGetSet<string>,
    city: ReduxGetSet<string>,
    state: ReduxGetSet<string>,
    zipcode: ReduxGetSet<string>,
}

class AddressForm extends Component<StateProps, never> {
    render() {
        let query = `https://www.google.com/maps/embed/v1/place?key=AIzaSyDGXJiK0XkDxlx2loXvonuX6BJOIYpd0Lg&q=${this.props.address.get()}, ${this.props.city.get()} ,${this.props.state.get()} ${this.props.zipcode.get()}`;

        console.log(query);

        return (
            <Box>
                <MaterialHeader text={"Address"}/>
                <Grid className={"address-form-container"} container justify={"center"} spacing={8}>
                    <Grid item xs={6}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormField required
                                           label={"Address"}
                                           schema={Yup.string().required()}
                                           value={this.props.address}/>
                            </Grid>
                            <Grid item xs={12}>
                                <FormField required
                                           label={"City"}
                                           schema={Yup.string().required()}
                                           value={this.props.city}/>
                            </Grid>
                            <Grid item xs={12}>
                                <FormField required
                                           label={"State"}
                                           schema={Yup.string().required()}
                                           value={this.props.state}/>
                            </Grid>
                            <Grid item xs={12}>
                                <FormField required
                                           label={"Zipcode"}
                                           schema={Yup.string().required()}
                                           value={this.props.zipcode}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={"map"} elevation={3}>
                            <iframe title={"Google Address Map"} frameBorder="0" src={query} allowFullScreen/>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        );
    }
}

/*
 * Redux mappings and export
 */
function mapStateToProps(state: RootState) {
    return {
        address: () => state.address,
        city: () => state.city,
        state: () => state.state,
        zipcode: () => state.zipcode,
    }
}

const mapDispatchToProps = {
    address: (s: string) => addressSlice.actions.set(s),
    city: (s: string) => citySlice.actions.set(s),
    state: (s: string) => stateSlice.actions.set(s),
    zipcode: (s: string) => zipcodeSlice.actions.set(s),
}

const mergeProps = (stateProps: any, dispatchProps: any, ownProps: any) => {
    return {
        address: {
            get: stateProps.address,
            set: dispatchProps.address,
        },
        city: {
            get: stateProps.city,
            set: dispatchProps.city,
        },
        state: {
            get: stateProps.state,
            set: dispatchProps.state,
        },
        zipcode: {
            get: stateProps.zipcode,
            set: dispatchProps.zipcode,
        },
        ...ownProps,
    }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(AddressForm);