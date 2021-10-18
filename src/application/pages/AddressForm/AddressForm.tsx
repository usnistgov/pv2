import React, {useContext} from "react";

// Library Imports
import {Grid, Paper} from "@material-ui/core";
import * as Yup from "yup";
import {observer} from "mobx-react-lite";
import {action} from "mobx";

// User Imports
import MaterialHeader from "../../../components/MaterialHeader/MaterialHeader";
import {Store} from "../../ApplicationStore";
import {
    ADDRESS_LABEL,
    ADDRESS_TOOLTIP,
    CITY_LABEL,
    CITY_TOOLTIP,
    STATE_LABEL,
    STATE_TOOLTIP,
    ZIPCODE_LABEL,
    ZIPCODE_TOOLTIP
} from "../../../Strings";
import ValidatedTextField from "../../../components/ValidatedTextField";
import Info from "../../../components/Info/Info";
import ResetButton from "../../../components/ResetButton/ResetButton";

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
    const wholeMap = !(store.address || store.city || store.state || store.zipcode) ? "&center=39.8097343,-98.5556199&zoom=3" : "";
    const query = `https://www.google.com/maps/embed/v1/place?key=AIzaSyDGXJiK0XkDxlx2loXvonuX6BJOIYpd0Lg&q=${store.address}, ${store.city}, ${store.state} ${store.zipcode}${wholeMap}`;

    return (
        <>
            <MaterialHeader text={"Address"} right={<ResetButton onClick={() => store.reset()}/>}/>
            <div className={"address-form-text"}>
                Insert address for home on which a solar PV system may be installed.
                Only the ZIP Code is necessary for [PV]<sup>2</sup> to calculate results.
            </div>
            <Grid className={"address-form-container"} container justifyContent={"center"} spacing={8}>
                <Grid item xs={6}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Info tooltip={ADDRESS_TOOLTIP}>
                                <ValidatedTextField fullWidth
                                                    label={ADDRESS_LABEL}
                                                    value={store.address}
                                                    variant={"filled"}
                                                    schema={Yup.string()}
                                                    onValidate={action((value) => store.address = value)}/>
                            </Info>
                        </Grid>
                        <Grid item xs={12}>
                            <Info tooltip={CITY_TOOLTIP}>
                                <ValidatedTextField fullWidth
                                                    label={CITY_LABEL}
                                                    value={store.city}
                                                    variant={"filled"}
                                                    schema={Yup.string()}
                                                    onValidate={action((value) => store.city = value)}/>
                            </Info>
                        </Grid>
                        <Grid item xs={12}>
                            <Info tooltip={STATE_TOOLTIP}>
                                <ValidatedTextField fullWidth
                                                    label={STATE_LABEL}
                                                    value={store.state}
                                                    variant={"filled"}
                                                    schema={Yup.string()}
                                                    onValidate={action((value) => store.state = value)}/>
                            </Info>
                        </Grid>
                        <Grid item xs={12}>
                            <Info tooltip={ZIPCODE_TOOLTIP}>
                                <ValidatedTextField fullWidth
                                                    required
                                                    label={ZIPCODE_LABEL}
                                                    value={store.zipcode}
                                                    variant={"filled"}
                                                    schema={Yup.string().required()}
                                                    onValidate={action((value) => store.zipcode = value)}/>
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
