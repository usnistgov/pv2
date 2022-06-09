import React, {useContext} from "react";

// Library Imports
import {Box, Grid} from "@material-ui/core";
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

/*
 * The AddressForm component is the first page of the application form that lets user fill
 * in their address and displays an embedded iframe of Google Maps with the inputted location.
 */
const AddressForm = observer(() => {
    const store = useContext(Store).addressFormStore;

    return (
        <Box className={"form-page-container"}>
            <MaterialHeader text={"Address"} right={<ResetButton onClick={() => store.reset()}/>}/>
            <div className={"form-page-text"}>
                Insert address for home on which a solar PV system may be installed.
                Only the ZIP Code is necessary for [PV]<sup>2</sup> to calculate results.
            </div>
            <Box className={"form-single-column-container"}>
                <Info tooltip={ADDRESS_TOOLTIP}>
                    <ValidatedTextField fullWidth
                                        label={ADDRESS_LABEL}
                                        value={store.address}
                                        variant={"filled"}
                                        schema={Yup.string()}
                                        onValidate={action((value) => store.address = value)}/>
                </Info>
                <Info tooltip={CITY_TOOLTIP}>
                    <ValidatedTextField fullWidth
                                        label={CITY_LABEL}
                                        value={store.city}
                                        variant={"filled"}
                                        schema={Yup.string()}
                                        onValidate={action((value) => store.city = value)}/>
                </Info>
                <Info tooltip={STATE_TOOLTIP}>
                    <ValidatedTextField fullWidth
                                        label={STATE_LABEL}
                                        value={store.state}
                                        variant={"filled"}
                                        schema={Yup.string()}
                                        onValidate={action((value) => store.state = value)}/>
                </Info>
                <Info tooltip={ZIPCODE_TOOLTIP}>
                    <ValidatedTextField fullWidth
                                        required
                                        label={ZIPCODE_LABEL}
                                        value={store.zipcode}
                                        variant={"filled"}
                                        schema={Yup.string().required()}
                                        onValidate={action((value) => store.zipcode = value)}/>
                </Info>
            </Box>
        </Box>
    );
})

export default AddressForm;
