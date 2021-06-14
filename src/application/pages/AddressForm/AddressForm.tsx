import {ReactElement} from "react";

// Library Imports
import {Grid, Paper} from "@material-ui/core";
import * as Yup from 'yup';

// User Imports
import MaterialHeader from "../../../components/MaterialHeader/MaterialHeader";
import FormField from "../../../components/FormField/FormField";
import {useReduxGetSet} from "../../../Utils";

// Stylesheets
import "./AddressForm.sass"

/*
 * The AddressForm component is the first page of the application form that lets user fill
 * in their address and displays an embedded iframe of Google Maps with the inputted location.
 */
export default function AddressForm(): ReactElement {
    // Redux state values
    const address = useReduxGetSet("address");
    const city = useReduxGetSet("city");
    const state = useReduxGetSet("state");
    const zipcode = useReduxGetSet("zipcode");

    // Google Maps embedded url query
    // TODO replace this with real key
    const query = `https://www.google.com/maps/embed/v1/place?key=AIzaSyDGXJiK0XkDxlx2loXvonuX6BJOIYpd0Lg&q=${address.get()}, ${city.get()} ,${state.get()} ${zipcode.get()}`;

    return (
        <>
            <MaterialHeader text={"Address"}/>
            <Grid className={"address-form-container"} container justify={"center"} spacing={8}>
                <Grid item xs={6}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormField required
                                       tooltip={"Your Home Address"}
                                       label={"Address"}
                                       schema={Yup.string().required()}
                                       value={address}/>
                        </Grid>
                        <Grid item xs={12}>
                            <FormField required
                                       tooltip={"Your Home Address"}
                                       label={"City"}
                                       schema={Yup.string().required()}
                                       value={city}/>
                        </Grid>
                        <Grid item xs={12}>
                            <FormField required
                                       tooltip={"Your Home Address"}
                                       label={"State"}
                                       schema={Yup.string().required()}
                                       value={state}/>
                        </Grid>
                        <Grid item xs={12}>
                            <FormField required
                                       tooltip={"Your Home Address"}
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
