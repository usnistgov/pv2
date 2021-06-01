import {ReactElement} from "react";

import {Box, Grid, Paper} from "@material-ui/core";
import * as Yup from 'yup';

import MaterialHeader from "../../components/MaterialHeader/MaterialHeader";
import FormField from "../../components/FormField/FormField";
import {useReduxGetSet} from "../../Utils";

import "./AddressForm.css"


/*
 * The AddressForm component is the first page of the application form that lets user fill
 * in their address and displays an embedded iframe of Google Maps with the inputted location.
 */
export default function AddressForm(): ReactElement {
    // Redux state values
    const address = useReduxGetSet<string>("address", "");
    const city = useReduxGetSet<string>("city", "");
    const state = useReduxGetSet<string>("state", "");
    const zipcode = useReduxGetSet<string>("zipcode", "");

    // Google Maps embedded url query
    const query = `https://www.google.com/maps/embed/v1/place?key=AIzaSyDGXJiK0XkDxlx2loXvonuX6BJOIYpd0Lg&q=${address.get()}, ${city.get()} ,${state.get()} ${zipcode.get()}`;

    return (
        <>
            <MaterialHeader text={"Address"}/>
            <Grid className={"address-form-container"} container justify={"center"} spacing={8}>
                <Grid item xs={6}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormField required
                                       label={"Address"}
                                       schema={Yup.string().required()}
                                       value={address}/>
                        </Grid>
                        <Grid item xs={12}>
                            <FormField required
                                       label={"City"}
                                       schema={Yup.string().required()}
                                       value={city}/>
                        </Grid>
                        <Grid item xs={12}>
                            <FormField required
                                       label={"State"}
                                       schema={Yup.string().required()}
                                       value={state}/>
                        </Grid>
                        <Grid item xs={12}>
                            <FormField required
                                       label={"Zipcode"}
                                       schema={Yup.string().required()}
                                       value={zipcode}/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={"map"} elevation={3}>
                        <iframe title={"Google Address Map"} frameBorder="0" src={query} allowFullScreen/>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
}
