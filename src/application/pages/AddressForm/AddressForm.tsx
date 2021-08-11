import React, {useContext} from "react";

// Library Imports
import {Grid, Paper} from "@material-ui/core";
import * as Yup from "yup";
import {observer} from "mobx-react-lite";

// User Imports
import MaterialHeader from "../../../components/MaterialHeader/MaterialHeader";
import {Store} from "../../ApplicationStore";
import {ADDRESS_FORM_TOOLTIP, ADDRESS_LABEL, CITY_LABEL, STATE_LABEL, ZIPCODE_LABEL} from "../../../Strings";
import ValidatedTextField from "../../../components/ValidatedTextField";
import Info from "../../../components/Info";

// Stylesheets
import "./AddressForm.sass"

/*
 * The AddressForm component is the first page of the application form that lets user fill
 * in their address and displays an embedded iframe of Google Maps with the inputted location.
 */
const AddressForm = observer(() => {
    const store = useContext(Store).addressFormStore;

    // Google Maps embedded url query
    // TODO replace this with real key
    const query = `https://www.google.com/maps/embed/v1/place?key=AIzaSyDGXJiK0XkDxlx2loXvonuX6BJOIYpd0Lg&q=${store.address}, ${store.city}, ${store.state} ${store.zipcode}`;

    return (
        <>
            <MaterialHeader text={"Address"}/>
            <Grid className={"address-form-container"} container justify={"center"} spacing={8}>
                <Grid item xs={6}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Info tooltip={ADDRESS_FORM_TOOLTIP}>
                                <ValidatedTextField fullWidth
                                                    required
                                                    label={ADDRESS_LABEL}
                                                    defaultValue={store.address}
                                                    variant={"filled"}
                                                    schema={Yup.string().required()}
                                                    onValidate={(value) => store.address = value}/>
                            </Info>
                        </Grid>
                        <Grid item xs={12}>
                            <Info tooltip={ADDRESS_FORM_TOOLTIP}>
                                <ValidatedTextField fullWidth
                                                    required
                                                    label={CITY_LABEL}
                                                    defaultValue={store.address}
                                                    variant={"filled"}
                                                    schema={Yup.string().required()}
                                                    onValidate={(value) => store.city = value}/>
                            </Info>
                        </Grid>
                        <Grid item xs={12}>
                            <Info tooltip={ADDRESS_FORM_TOOLTIP}>
                                <ValidatedTextField fullWidth
                                                    required
                                                    label={STATE_LABEL}
                                                    defaultValue={store.address}
                                                    variant={"filled"}
                                                    schema={Yup.string().required()}
                                                    onValidate={(value) => store.state = value}/>
                            </Info>
                        </Grid>
                        <Grid item xs={12}>
                            <Info tooltip={ADDRESS_FORM_TOOLTIP}>
                                <ValidatedTextField fullWidth
                                                    required
                                                    label={ZIPCODE_LABEL}
                                                    defaultValue={store.address}
                                                    variant={"filled"}
                                                    schema={Yup.string().required()}
                                                    onValidate={(value) => store.zipcode = value}/>
                            </Info>
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
})

export default AddressForm;
